
import { Education } from "@app/models/education";
import { education as RawEducation} from "@prisma/client";

export class PrismaEducationMapper {
  
  static toPrisma(education: Education) {
    return {
      id: education.id,
      type: education.type,
      institution: education.institution,
      duration: education.duration,
      completed_on: education.completed_on,
      arquive: education.arquive,
      curriculum_id: education.curriculum_id,
      disabled_at: education.disabled_at ?? null,
    }
  }

  static toDomain( raw: RawEducation ) : Education {
    return new Education({
      type: raw.type,
      institution: raw.institution,
      duration: raw.duration,
      completed_on: raw.completed_on,
      arquive: raw.arquive,
      curriculum_id: raw.curriculum_id,
      disabled_at: raw.disabled_at ?? null,
    }, raw.id)
  }
}
