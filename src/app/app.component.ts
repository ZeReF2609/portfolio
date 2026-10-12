import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { ExperienceComponent } from "./components/experience/experience.component";
import { ScrollHelpersComponent } from './components/scroll-helpers/scroll-helpers.component';

@Component({
    selector: 'app-root',
    imports: [
        HeaderComponent,
        HeroComponent,
        AboutComponent,
        SkillsComponent,
        ProjectsComponent,
        CertificationsComponent,
        ContactComponent,
        FooterComponent,
        ThemeSelectorComponent,
        ExperienceComponent,
        ScrollHelpersComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
}
