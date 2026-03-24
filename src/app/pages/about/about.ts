import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about.html',
  styleUrl: './about.css',
  imports: [CommonModule],
})
export class AboutPageComponent {
  private readonly projectsService = inject(ProjectsService);

  protected readonly highlightedProjects = this.projectsService.getFeatured(3);

  protected trackByProject(index: number, project: Project): string {
    return `${project.slug}-${index}`;
  }
}
