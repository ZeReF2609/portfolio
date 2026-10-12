export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
