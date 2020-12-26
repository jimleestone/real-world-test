import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { Profile, ProfilesService, UserService } from 'src/app/core';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap

    this.userService.isAuthenticated
      .pipe(
        concatMap((authenticated) => {
          // Not authenticated? Push to login screen
          if (!authenticated) {
            this.router.navigateByUrl('/login');
            return of(null);
          }

          // Follow this profile if we aren't already
          if (!this.profile.following) {
            return this.profilesService.follow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(true);
                },
                (err) => (this.isSubmitting = false)
              )
            );

            // Otherwise, unfollow this profile
          } else {
            return this.profilesService.unfollow(this.profile.username).pipe(
              tap(
                (data) => {
                  this.isSubmitting = false;
                  this.toggle.emit(false);
                },
                (err) => (this.isSubmitting = false)
              )
            );
          }
        })
      )
      .subscribe();
  }
}
