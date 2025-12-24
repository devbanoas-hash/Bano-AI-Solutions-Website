/**
 * Snap Scroll Utility
 * Implements section-based snap scrolling with special handling for long sections
 * 
 * Requirements:
 * - Scroll to jump between sections instead of smooth scrolling
 * - If section is longer than viewport: first scroll goes to middle, second to end, third to next section
 */

interface SectionInfo {
  element: HTMLElement
  top: number
  bottom: number
  height: number
  isLong: boolean // height > viewport height
}

interface ScrollState {
  currentSectionIndex: number
  longSectionScrollStep: number // 0: start, 1: middle, 2: end
  isScrolling: boolean
  lastScrollTime: number
  lastScrollPosition: number // Track last scroll position to detect direction
  accumulatedDeltaY: number // Accumulate deltaY for touchpad smooth scrolling
  lastWheelTime: number // Track time of last wheel event
}

export class SnapScroll {
  private sections: SectionInfo[] = []
  private state: ScrollState = {
    currentSectionIndex: 0,
    longSectionScrollStep: 0,
    isScrolling: false,
    lastScrollTime: 0,
    lastScrollPosition: 0,
    accumulatedDeltaY: 0,
    lastWheelTime: 0,
  }
  private viewportHeight: number = 0
  private scrollDebounceTime: number = 500 // ms to wait before allowing next scroll
  private wheelHandler: ((e: WheelEvent) => void) | null = null
  private accumulatedDeltaThreshold: number = 50 // Minimum accumulated deltaY to trigger scroll
  private wheelAccumulationTimeout: number = 150 // ms to wait before processing accumulated delta

  constructor() {
    this.viewportHeight = window.innerHeight
    this.setupResizeHandler()
  }

  private setupResizeHandler() {
    window.addEventListener('resize', () => {
      this.viewportHeight = window.innerHeight
      this.updateSections()
    })
  }

  /**
   * Find all sections on the page
   * Sections are identified by <section> tags, <footer> tags, or elements with data-section attribute
   */
  private findSections(): HTMLElement[] {
    const sections = Array.from(document.querySelectorAll('section'))
    
    // Also check for elements with data-section attribute
    const dataSections = Array.from(document.querySelectorAll('[data-section]'))
    
    // Include footer as a section
    const footers = Array.from(document.querySelectorAll('footer'))
    
    // Combine and deduplicate
    const allSections = [...sections, ...dataSections, ...footers] as HTMLElement[]
    const uniqueSections = Array.from(new Set(allSections))
    
    // Sort by position in DOM
    return uniqueSections.sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()
      return rectA.top - rectB.top
    })
  }

  /**
   * Update section information
   */
  private updateSections() {
    const sectionElements = this.findSections()
    
    this.sections = sectionElements.map((el) => {
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      return {
        element: el,
        top: rect.top + scrollTop,
        bottom: rect.bottom + scrollTop,
        height: rect.height,
        isLong: rect.height > this.viewportHeight,
      }
    })

    // Update current section index based on scroll position
    this.updateCurrentSection()
  }

  /**
   * Determine which section the user is currently viewing
   */
  private updateCurrentSection() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const viewportMiddle = scrollTop + this.viewportHeight / 2
    const maxScroll = document.documentElement.scrollHeight - this.viewportHeight

    // Check if we're at the bottom of the page (near footer)
    if (scrollTop >= maxScroll - 50 && this.sections.length > 0) {
      // Set to last section (footer)
      const lastIndex = this.sections.length - 1
      if (this.state.currentSectionIndex !== lastIndex) {
        this.state.currentSectionIndex = lastIndex
        const lastSection = this.sections[lastIndex]
        if (lastSection.isLong) {
          this.state.longSectionScrollStep = 2
        } else {
          this.state.longSectionScrollStep = 0
        }
      }
      return
    }

    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i]
      if (viewportMiddle >= section.top && viewportMiddle < section.bottom) {
        const prevIndex = this.state.currentSectionIndex
        this.state.currentSectionIndex = i
        
        // Reset long section scroll step if we're in a new section
        if (i !== prevIndex) {
          // Determine scroll step based on position in section
          const sectionStart = section.top
          const sectionMiddle = section.top + section.height / 2
          const sectionEnd = section.bottom - this.viewportHeight
          
          if (section.isLong) {
            const distanceFromStart = Math.abs(scrollTop - sectionStart)
            const distanceFromMiddle = Math.abs(scrollTop - sectionMiddle)
            const distanceFromEnd = Math.abs(scrollTop - sectionEnd)
            
            if (distanceFromStart < distanceFromMiddle && distanceFromStart < distanceFromEnd) {
              this.state.longSectionScrollStep = 0
            } else if (distanceFromMiddle < distanceFromEnd) {
              this.state.longSectionScrollStep = 1
            } else {
              this.state.longSectionScrollStep = 2
            }
          } else {
            this.state.longSectionScrollStep = 0
          }
        }
        break
      }
    }
  }

  /**
   * Get target scroll position for next scroll action
   */
  private getTargetScrollPosition(direction: 'up' | 'down'): number {
    if (this.sections.length === 0) return window.pageYOffset

    const currentSection = this.sections[this.state.currentSectionIndex]
    if (!currentSection) return window.pageYOffset

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    // Handle long sections (height > viewport)
    if (currentSection.isLong) {
      const sectionStart = currentSection.top
      const sectionMiddle = currentSection.top + currentSection.height / 2 - this.viewportHeight / 2
      const sectionEnd = currentSection.bottom - this.viewportHeight

      if (direction === 'down') {
        // Step 0 (start) -> Step 1 (middle)
        if (this.state.longSectionScrollStep === 0) {
          this.state.longSectionScrollStep = 1
          return sectionMiddle
        }
        // Step 1 (middle) -> Step 2 (end)
        else if (this.state.longSectionScrollStep === 1) {
          this.state.longSectionScrollStep = 2
          return sectionEnd
        }
        // Step 2 (end) -> Next section
        else {
          const nextIndex = this.state.currentSectionIndex + 1
          if (nextIndex < this.sections.length) {
            this.state.currentSectionIndex = nextIndex
            this.state.longSectionScrollStep = 0
            return this.sections[nextIndex].top
          } else {
            // At last section, allow scrolling to bottom of page
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - this.viewportHeight)
            if (scrollTop < maxScroll - 10) {
              return maxScroll
            }
          }
        }
      } else {
        // Scrolling up
        // Step 2 (end) -> Step 1 (middle)
        if (this.state.longSectionScrollStep === 2) {
          this.state.longSectionScrollStep = 1
          return sectionMiddle
        }
        // Step 1 (middle) -> Step 0 (start)
        else if (this.state.longSectionScrollStep === 1) {
          this.state.longSectionScrollStep = 0
          return sectionStart
        }
        // Step 0 (start) -> Previous section
        else {
          const prevIndex = this.state.currentSectionIndex - 1
          if (prevIndex >= 0) {
            this.state.currentSectionIndex = prevIndex
            const prevSection = this.sections[prevIndex]
            // If previous section is also long, go to its end
            if (prevSection.isLong) {
              this.state.longSectionScrollStep = 2
              return prevSection.bottom - this.viewportHeight
            } else {
              this.state.longSectionScrollStep = 0
              return prevSection.top
            }
          }
        }
      }
    } else {
      // Short section: jump directly to next/previous section
      if (direction === 'down') {
        const nextIndex = this.state.currentSectionIndex + 1
        if (nextIndex < this.sections.length) {
          this.state.currentSectionIndex = nextIndex
          this.state.longSectionScrollStep = 0
          return this.sections[nextIndex].top
        } else {
          // At last section, allow scrolling to bottom of page
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - this.viewportHeight)
          if (scrollTop < maxScroll - 10) {
            return maxScroll
          }
        }
      } else {
        const prevIndex = this.state.currentSectionIndex - 1
        if (prevIndex >= 0) {
          this.state.currentSectionIndex = prevIndex
          const prevSection = this.sections[prevIndex]
          // If previous section is long, go to its end
          if (prevSection.isLong) {
            this.state.longSectionScrollStep = 2
            return prevSection.bottom - this.viewportHeight
          } else {
            this.state.longSectionScrollStep = 0
            return prevSection.top
          }
        }
      }
    }

    // If we're at the last section and scrolling down, allow scrolling to bottom
    if (direction === 'down' && this.state.currentSectionIndex === this.sections.length - 1) {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - this.viewportHeight)
      if (scrollTop < maxScroll - 10) {
        return maxScroll
      }
    }

    return scrollTop
  }

  /**
   * Scroll to target position
   */
  private scrollTo(target: number) {
    if (this.state.isScrolling) return

    this.state.isScrolling = true
    
    window.scrollTo({
      top: target,
      behavior: 'smooth',
    })

    // Update state after scroll completes
    setTimeout(() => {
      this.state.isScrolling = false
      this.updateCurrentSection()
    }, 600) // Adjust based on scroll duration
  }

  /**
   * Check if element or its parents have horizontal scroll
   */
  private isHorizontalScrollContainer(element: HTMLElement | null): boolean {
    if (!element) return false
    
    // Check if element has horizontal scroll
    if (element.scrollWidth > element.clientWidth && 
        (element.style.overflowX === 'auto' || 
         element.style.overflowX === 'scroll' ||
         getComputedStyle(element).overflowX === 'auto' ||
         getComputedStyle(element).overflowX === 'scroll')) {
      return true
    }
    
    // Check parent elements
    let parent = element.parentElement
    while (parent && parent !== document.body) {
      if (parent.scrollWidth > parent.clientWidth && 
          (getComputedStyle(parent).overflowX === 'auto' ||
           getComputedStyle(parent).overflowX === 'scroll')) {
        return true
      }
      parent = parent.parentElement
    }
    
    return false
  }

  /**
   * Process accumulated wheel delta and trigger scroll if threshold is met
   */
  private processAccumulatedDelta() {
    if (this.state.isScrolling) {
      return
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const now = Date.now()
    
    // Check if enough time has passed since last scroll
    if (now - this.state.lastScrollTime < this.scrollDebounceTime) {
      return
    }

    // Check if accumulated delta meets threshold
    if (Math.abs(this.state.accumulatedDeltaY) < this.accumulatedDeltaThreshold) {
      return
    }

    // Update current section before determining direction
    this.updateCurrentSection()

    const direction = this.state.accumulatedDeltaY > 0 ? 'down' : 'up'
    const targetScroll = this.getTargetScrollPosition(direction)
    
    // Only scroll if target is different from current position
    if (Math.abs(targetScroll - scrollTop) > 10) {
      this.state.lastScrollTime = now
      this.state.lastScrollPosition = scrollTop
      this.state.accumulatedDeltaY = 0 // Reset accumulated delta
      this.scrollTo(targetScroll)
    }
  }

  /**
   * Handle wheel event
   */
  private handleWheel = (e: WheelEvent) => {
    const target = e.target as HTMLElement
    
    // Skip if hovering over horizontal scroll container
    if (this.isHorizontalScrollContainer(target)) {
      // Check if horizontal scroll is possible
      const container = target.closest('[style*="overflow-x"], [class*="overflow-x"]') as HTMLElement
      if (container) {
        const canScrollLeft = container.scrollLeft > 0
        const canScrollRight = container.scrollLeft < container.scrollWidth - container.clientWidth
        
        // If horizontal scrolling is possible and user is scrolling horizontally, allow it
        if ((canScrollLeft || canScrollRight) && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          return // Let horizontal scroll happen
        }
      }
    }

    // Prevent default smooth scrolling
    e.preventDefault()
    e.stopPropagation()

    const now = Date.now()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    
    // Detect if this is likely a touchpad (many small deltaY values) or mouse wheel (few large deltaY values)
    const isLikelyTouchpad = Math.abs(e.deltaY) < 100 && e.deltaMode === 0
    
    if (this.state.isScrolling) {
      // If scrolling, accumulate delta but don't process yet
      if (isLikelyTouchpad) {
        this.state.accumulatedDeltaY += e.deltaY
      }
      return
    }

    if (isLikelyTouchpad) {
      // For touchpad: accumulate deltaY and process after a delay
      // If direction changed, reset accumulation
      if (
        (this.state.accumulatedDeltaY > 0 && e.deltaY < 0) ||
        (this.state.accumulatedDeltaY < 0 && e.deltaY > 0)
      ) {
        this.state.accumulatedDeltaY = 0
      }
      
      this.state.accumulatedDeltaY += e.deltaY
      this.state.lastWheelTime = now
      
      // Clear any existing timeout
      if ((this as any).accumulationTimeout) {
        clearTimeout((this as any).accumulationTimeout)
      }
      
      // Process accumulated delta after a short delay
      ;(this as any).accumulationTimeout = setTimeout(() => {
        this.processAccumulatedDelta()
      }, this.wheelAccumulationTimeout)
    } else {
      // For mouse wheel: process immediately if debounce time has passed
      if (now - this.state.lastScrollTime < this.scrollDebounceTime) {
        return
      }

      // Update current section before determining direction
      this.updateCurrentSection()

      const direction = e.deltaY > 0 ? 'down' : 'up'
      const targetScroll = this.getTargetScrollPosition(direction)
      
      // Only scroll if target is different from current position
      if (Math.abs(targetScroll - scrollTop) > 10) {
        this.state.lastScrollTime = now
        this.state.lastScrollPosition = scrollTop
        this.state.accumulatedDeltaY = 0 // Reset accumulated delta
        this.scrollTo(targetScroll)
      }
    }
  }

  /**
   * Initialize snap scroll
   */
  public init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.updateSections()
        this.attachWheelListener()
      })
    } else {
      // DOM is already ready
      setTimeout(() => {
        this.updateSections()
        this.attachWheelListener()
      }, 100)
    }

    // Update sections on route changes (for SPA)
    this.setupRouteChangeListener()
  }

  /**
   * Attach wheel event listener
   */
  private attachWheelListener() {
    if (this.wheelHandler) {
      window.removeEventListener('wheel', this.wheelHandler as EventListener)
    }

    this.wheelHandler = this.handleWheel
    window.addEventListener('wheel', this.wheelHandler as EventListener, { passive: false } as AddEventListenerOptions)
  }

  /**
   * Setup listener for route changes (for SPA like wouter)
   */
  private setupRouteChangeListener() {
    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.updateSections()
        this.updateCurrentSection()
      }, 100)
    })

    // Also listen for custom route change events if needed
    // This can be extended based on your routing library
  }

  /**
   * Manually refresh sections (useful after dynamic content changes)
   */
  public refresh() {
    this.updateSections()
    this.updateCurrentSection()
  }

  /**
   * Destroy snap scroll instance
   */
  public destroy() {
    if (this.wheelHandler) {
      window.removeEventListener('wheel', this.wheelHandler as EventListener)
      this.wheelHandler = null
    }
    
    // Clear any pending accumulation timeout
    if ((this as any).accumulationTimeout) {
      clearTimeout((this as any).accumulationTimeout)
      ;(this as any).accumulationTimeout = null
    }
  }
}

// Singleton instance
let snapScrollInstance: SnapScroll | null = null

/**
 * Initialize snap scroll globally
 */
export function initSnapScroll() {
  if (snapScrollInstance) {
    snapScrollInstance.destroy()
  }
  
  snapScrollInstance = new SnapScroll()
  snapScrollInstance.init()
  
  return snapScrollInstance
}

/**
 * Get current snap scroll instance
 */
export function getSnapScroll() {
  return snapScrollInstance
}

/**
 * Refresh snap scroll (call after route changes or content updates)
 */
export function refreshSnapScroll() {
  if (snapScrollInstance) {
    snapScrollInstance.refresh()
  }
}

