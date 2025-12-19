import { industries } from "../../constants/diagnostic.constant"

export interface RoadmapPhase {
  title: string
  items: Array<{
    action: string
    result: string
  }>
}

export interface RoadmapData {
  output: {
    industry: string
    roadmap: {
      phase_1: RoadmapPhase
      phase_2: RoadmapPhase
      phase_3: RoadmapPhase
    }
  }
}

export type IndustryData = (typeof industries)[number]

export interface UserState {
  step: number
  selectedIndustryId: IndustryData["id"] | null
  companyName: string
  companySize: string
  confirmedPainPoints: string[]
  phoneNumber: string
}


