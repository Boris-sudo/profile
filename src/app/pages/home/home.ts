import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule],
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('introSection') private readonly introSection?: ElementRef<HTMLElement>;
  @ViewChildren('revealRef') private readonly revealRefs!: QueryList<ElementRef<HTMLElement>>;

  private readonly projectsService = inject(ProjectsService);

  protected readonly selectedProjects = this.projectsService.getFeatured(4);
  protected readonly skills = ['Angular', 'React', 'Node.js', 'Python', 'C++', 'Lean', 'UI/UX', 'Figma', 'Webstorm', 'Github'];
  protected readonly achievements = [
    'Призер регионального этапа ВСОШ по информатике 2024-2025',
    'Призер регионального этапа ВСОШ по информатике 2023-2024',
    'Призер международной олимпиады PROD по промышленной разработке',
  ];

  protected titleOpacity = 1;
  protected titleLift = 0;
  protected titleScale = 1;
  protected firstLineOffset = 0;
  protected secondLineOffset = 0;
  protected mistOpacity = 0.56;

  ngAfterViewInit(): void {
    this.updateIntroState();
    this.setupRevealObserver();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateIntroState();
  }

  protected trackByProject(index: number, project: Project): string {
    return `${project.slug}-${index}`;
  }

  private setupRevealObserver(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    this.revealRefs.forEach((ref) => observer.observe(ref.nativeElement));
  }

  private updateIntroState(): void {
    const introElement = this.introSection?.nativeElement;

    if (!introElement) {
      return;
    }

    const rect = introElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = Math.min(Math.max(-rect.top / viewportHeight, 0), 1);

    this.firstLineOffset = progress * -72;
    this.secondLineOffset = progress * 72;
    this.titleOpacity = Math.max(1 - progress * 0.78, 0.24);
    this.titleLift = progress * 56;
    this.titleScale = Math.max(1 - progress * 0.05, 0.95);
    this.mistOpacity = Math.max(0.56 - progress * 0.22, 0.18);
  }
}
