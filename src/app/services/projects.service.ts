import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private readonly projects: Project[] = [
        {
            id: 1,
            order: '01',
            slug: 'trip-tuner',
            title: 'Trip Tuner',
            subtitle: 'Маршруты из естественного описания',
            summary: 'Сервис строит прогулочные маршруты по текстовому сценарию пользователя, бюджету и выбранным точкам начала и конца.',
            description:
                'Frontend на Angular, backend на Node.js с koa, tsoa и typeORM, MongoDB для данных и RabbitMQ для многопоточной обработки. Маршрут строится через разбор пользовательского промпта и оптимизацию по времени, расстоянию и стоимости.',
            tags: ['Angular', 'Node.js', 'MongoDB', 'RabbitMQ'],
            githubUrl: 'https://github.com/TripTuner',
            featured: true,
            accent: 'warm',
        },
        {
            id: 2,
            order: '02',
            slug: 'my-topology',
            title: 'My Topology',
            subtitle: 'Исследовательский Lean-проект',
            summary: 'Работа с математическими структурами и доказательствами на Lean с опорой на топологию Бурбаки и Виро.',
            description:
                'Проект исследует представленные разработчиками формализации топологии и развивает собственные конструкции. Весь стек построен вокруг Lean и строгой работы с теоремами и алгебраическими структурами.',
            tags: ['Lean', 'Math', 'Research'],
            githubUrl: 'https://github.com/Boris-sudo/MyTopology',
            featured: true,
            accent: 'cool',
        },
        {
            id: 3,
            order: '03',
            slug: 'shatun',
            title: 'Shatun',
            subtitle: 'Сайт походов',
            summary: 'Сайт походов для туристического клуба Shatun.',
            description: 'Небольшой сайт на Angular с быстро регулируемыми блогами (информацией про походы).',
            tags: ['Frontend', 'Angular', 'Blogs'],
            githubUrl: 'https://github.com/Boris-sudo/Shatun',
            featured: true,
            accent: 'warm',
        },
        {
            id: 4,
            order: '04',
            slug: 'styllz',
            title: 'Styllz',
            subtitle: 'Виртуальная онлайн-примерочная',
            summary: 'Fashion-tech концепт, где фото пользователя и описание одежды превращаются в новый визуальный образ.',
            description:
                'Мультирепо-проект с frontend на Angular и backend на Django/PostgreSQL в Docker. Идея развивалась в сторону генерации образов и потенциального поиска вещей по маркетплейсам.',
            tags: ['Angular', 'Django', 'PostgreSQL', 'Docker'],
            githubUrl: 'https://github.com/Styllz-dev',
            featured: true,
            accent: 'cool',
        },
        {
            id: 5,
            order: '05',
            slug: 'strategy-game',
            title: 'Strategy game',
            subtitle: 'Игровая системная разработка',
            summary: 'Игровой проект с упором на механику, состояние системы и продуманную логику взаимодействий.',
            description:
                'Здесь интересен не только код, но и построение правил, баланса и внутренней архитектуры игры как системы с собственным поведением и UX-ритмом.',
            tags: ['Game', 'Strategy', 'Systems'],
            githubUrl: 'https://github.com/gurovic/Strategy_game',
            accent: 'warm',
        },
        {
            id: 6,
            order: '06',
            slug: 'olympiad-programming-tgbot',
            title: 'Olympiad Programming tgbot',
            subtitle: 'Телеграм-бот для олимпиадной подготовки',
            summary: 'MVP-бот с ежедневными задачами, рейтингом участников и логикой проверки активности.',
            description:
                'Backend построен на Django, бот реализован на aiogram. Источник задач интегрирован через открытое API Codeforces, а продукт ориентирован на регулярную практику и соревновательный прогресс.',
            tags: ['Django', 'Aiogram', 'Telegram', 'Codeforces API'],
            githubUrl: 'https://github.com/Boris-sudo/OlympiadProgrammingTgBot',
            featured: false,
            accent: 'cool',
        },
        {
            id: 7,
            order: '07',
            slug: 'moscow-prod-hack-frontend',
            title: 'Moscow Prod Hack Frontend',
            subtitle: 'Хакатонный frontend-кейс',
            summary: 'Фронтенд-часть хакатонного проекта в контексте PROD и промышленной разработки.',
            description:
                'Проект важен как соревновательный и продуктовый кейс: быстрый цикл реализации, интерфейсная часть и работа в условиях ограниченного времени и сильной командной динамики.',
            tags: ['Frontend', 'Hackathon', 'PROD'],
            githubUrl: 'https://github.com/Boris-sudo/MoscowProdHackFrontend',
            featured: false,
            accent: 'warm',
        },
    ];

    getAll(): Project[] {
        return this.projects;
    }

    getFeatured(limit?: number): Project[] {
        const featuredProjects = this.projects.filter((project) => project.featured);
        return typeof limit === 'number' ? featuredProjects.slice(0, limit) : featuredProjects;
    }

    getBySlug(slug: string): Project | undefined {
        return this.projects.find((project) => project.slug === slug);
    }
}
