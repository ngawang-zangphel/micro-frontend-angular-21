import {
  Component,
  ComponentRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MicroFrontend } from './micro-frontend';

type ViewId = 'home' | 'users' | 'announcements';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private readonly microFrontendService = inject(MicroFrontend);

  protected readonly view = signal<ViewId>('home');
  protected readonly nav: { id: ViewId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'users', label: 'Users' },
    { id: 'announcements', label: 'Announcements' },
  ];

  @ViewChild('users', { static: true, read: ViewContainerRef })
  private usersContainer!: ViewContainerRef;
  private usersComponentRef: ComponentRef<unknown> | null = null;

  @ViewChild('announcements', { static: true, read: ViewContainerRef })
  private announcementsContainer!: ViewContainerRef;
  private announcementsComponentRef: ComponentRef<unknown> | null = null;

  async ngOnInit() {
    await Promise.all([this.mountUsers(), this.mountAnnouncements()]);
  }

  ngOnDestroy(): void {
    this.usersComponentRef?.destroy();
    this.announcementsComponentRef?.destroy();
  }

  protected show(id: ViewId) {
    this.view.set(id);
  }

  private async mountUsers() {
    try {
      const UsersComponent = await this.microFrontendService.loadRemoteComponent(4201, 'users');
      this.usersContainer.clear();
      const ref = this.usersContainer.createComponent(UsersComponent);
      this.usersComponentRef = ref;
      ref.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  private async mountAnnouncements() {
    try {
      const AnnouncementsComponent = await this.microFrontendService.loadRemoteComponent(
        4202,
        'announcements',
      );
      this.announcementsContainer.clear();
      const ref = this.announcementsContainer.createComponent(AnnouncementsComponent);
      this.announcementsComponentRef = ref;
      ref.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error loading announcements:', error);
    }
  }
}
