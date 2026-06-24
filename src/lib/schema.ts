import { z } from "zod";

export const SubRepositorySchema = z.object({
  title: z.string(),
  description: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  tech: z.array(z.string()),
  link: z.string(),
  website: z.string().optional(),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  tech: z.array(z.string()),
  link: z.string(),
  category: z.enum(["work", "personal"]),
  featured: z.boolean().optional(),
  repositories: z.array(SubRepositorySchema).optional(),
  website: z.string().optional(),
  company: z.string().optional(),
});

export const TimelineItemSchema = z.object({
  id: z.number(),
  title: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  organization: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  date: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  status: z.string(),
  description: z.object({
    vi: z.array(z.string()),
    en: z.array(z.string()),
  }),
  type: z.enum(["work", "education"]),
});

export const SkillGroupSchema = z.object({
  category: z.object({
    vi: z.string(),
    en: z.string(),
  }),
  items: z.string(),
});

export const SocialLinkSchema = z.object({
  name: z.string(),
  icon: z.string(),
  link: z.string(),
  color: z.string(),
  desc: z.string(),
});

export const PortfolioDataSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    github: z.string(),
    experienceStartDate: z.string(), // Định dạng YYYY-MM-DD
  }),
  translations: z.object({
    vi: z.object({
      nav: z.object({
        home: z.string(),
        projects: z.string(),
        experience: z.string(),
        profile: z.string(),
      }),
      hero: z.object({
        hello: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        summary: z.string(),
        viewPortfolio: z.string(),
        contactMe: z.string(),
      }),
      sections: z.object({
        experience: z.string(),
        about: z.string(),
        skills: z.string(),
        featuredProject: z.string(),
        project: z.string(),
        education: z.string(),
        gpa: z.string(),
      }),
      profile: z.object({
        tag: z.string(),
        heading: z.string(),
        subHeading: z.string(),
        description: z.string(),
        location: z.string(),
      }),
      education: z.object({
        university: z.string(),
        degree: z.string(),
        duration: z.string(),
        gpaLabel: z.string(),
        gpaValue: z.string(),
      }),
      projects: z.object({
        tabs: z.object({
          professional: z.string(),
          personal: z.string(),
        }),
      }),
      socials: z.array(
        z.object({
          name: z.string(),
          desc: z.string(),
        })
      ),
    }),
    en: z.object({
      nav: z.object({
        home: z.string(),
        projects: z.string(),
        experience: z.string(),
        profile: z.string(),
      }),
      hero: z.object({
        hello: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        summary: z.string(),
        viewPortfolio: z.string(),
        contactMe: z.string(),
      }),
      sections: z.object({
        experience: z.string(),
        about: z.string(),
        skills: z.string(),
        featuredProject: z.string(),
        project: z.string(),
        education: z.string(),
        gpa: z.string(),
      }),
      profile: z.object({
        tag: z.string(),
        heading: z.string(),
        subHeading: z.string(),
        description: z.string(),
        location: z.string(),
      }),
      education: z.object({
        university: z.string(),
        degree: z.string(),
        duration: z.string(),
        gpaLabel: z.string(),
        gpaValue: z.string(),
      }),
      projects: z.object({
        tabs: z.object({
          professional: z.string(),
          personal: z.string(),
        }),
      }),
      socials: z.array(
        z.object({
          name: z.string(),
          desc: z.string(),
        })
      ),
    }),
  }),
  skills: z.array(SkillGroupSchema),
  socialLinks: z.array(SocialLinkSchema),
  projects: z.array(ProjectSchema),
  timeline: z.array(TimelineItemSchema),
});

export type PortfolioData = z.infer<typeof PortfolioDataSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SubRepository = z.infer<typeof SubRepositorySchema>;
export type TimelineItem = z.infer<typeof TimelineItemSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type SocialLink = z.infer<typeof SocialLinkSchema>;
