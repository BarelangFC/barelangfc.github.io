import {defineCollection, reference, z} from "astro:content";
import {glob} from "astro/loaders";
import type { Description, Title } from "@radix-ui/react-dialog";

const teamMember = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/teamMembers"}),
    schema: ({image}) => z.object({
        nim: z.number(),
        name: z.string(),
        angkatan: z.date(),
        role: z.string(),
        division: z.string(),
        prodi: z.string(),
        bio: z.string().optional(),
        status: z.string(),
        image: z.string(),
        education: z.array(z.object({
            degree: z.string().optional(),
            institution: z.string().optional(),
            year: z.string().optional(),
        })).optional(),
        experience: z.array(z.object({
            position: z.string().optional(),
            company: z.string().optional(),
            period: z.string().optional(),
        })).optional(),
        projects: z.array(z.object({
            name: z.string().optional(),
            description: z.string().optional(),
        })).optional(),
        awards: z.array(z.object({
            name: z.string().optional(),
            organization: z.string().optional(),
            year: z.string().optional(),
        })).optional(),
        contact: z.object({
            email: z.string().optional(),
            linkedin: z.string().optional(),
            instagram: z.string().optional(),
            github: z.string().optional(),
        }),
    })
});
const achievement = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/achievements"}),
    schema: ({image}) => z.object({
        title: z.string(),
        title2: z.string(),
        date: z.date(),
        date_end: z.date(),
        competition: z.string(),
        category: z.string(),
        description: z.string(),
        icon: z.string(),
        img: image(),
        teamMember: z.array(reference("teamMember").optional()),
    })
});
const division = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/divisions"}),
    schema: ({image}) => z.object({
        id: z.string(),
        name: z.string(),
        icon: image(),
        description: z.string(),
        longDescription: z.string(),
        image: image(),
        projects: z.array(z.string()),
        technologies: z.array(z.string()),
    })
})

const robot = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/robots"}),
    schema: ({image}) => z.object({
        name: z.string(),
        description: z.string(),
        date: z.date(),
        image: z.string(),
        status: z.string(),
    })
})

const publication = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/publications"}),
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        location: z.string(),
        description: z.string(),
        link: z.string(),
    })
})

const news = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/news"}),
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        category: z.string(),
        excerpt: z.string(),
        image: image(),
        relatedArticles: z.array(reference("news").optional()),
    })
})

const contacts = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/contacts"}),
    schema: () => z.object({
        email: z.string(),
        phone: z.string(),
        address: z.object({
            street: z.string(),
            city: z.string(),
            postalCode: z.string(),
            province: z.string(),
            country: z.string(),
        }),
        operations: z.array(z.string()),
        maps: z.string(),
    })

})

const lecturer = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/lecturers"}),
    schema: ({image}) => z.object({
        nik: z.number(),
        code: z.string(),
        name: z.string(),
        role: z.string(),
        status: z.string(),
        specialization: z.string(),
        isGuardianLecturer: z.boolean().optional(),
        photo: image(),
        contact: z.object({
            email: z.string().optional(),
            linkedin: z.string().optional(),
            instagram: z.string().optional(),
            github: z.string().optional(),
        }),
    })
});

const subject = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/subjects"}),
    schema: z.object({
        code: z.string(),
        title: z.string(),
        theory: reference("lecturer"),
        practice: reference("lecturer").optional(),
    })
});

const album = defineCollection({
    loader: glob({pattern: "**/*.md", base: "./src/contents/albums"}),
    schema: ({image}) => z.object({
        title: z.string(),
        date: z.date(),
        location: z.string(),
        cover: image(),
        contents: z.array(image())
    })
});

export const collections = {teamMember, achievement, division, robot, publication, news: news, contacts, lecturer, subject, album};