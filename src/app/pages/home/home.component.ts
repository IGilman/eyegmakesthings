import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutComponent } from '../../components/about.component';
import { ExperienceComponent } from '../../components/experience.component';
import { ProjectsComponent } from '../../components/projects.component';
import { SkillsComponent } from '../../components/skills.component';

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
  ],
  template: `
    <app-about />
    <app-projects />
    <app-skills />
    <app-experience />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}