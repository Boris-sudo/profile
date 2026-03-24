import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  imports: [CommonModule],
})
export class ProjectsPageComponent {
  private readonly projectsService = inject(ProjectsService);

  protected readonly projects = this.projectsService.getAll();
  protected readonly featuredProject = this.projects[0];
  protected readonly projectGrid = this.projects.slice(1);

  protected trackByProject(index: number, project: Project): string {
    return `${project.slug}-${index}`;
  }
}
