import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, tap } from 'rxjs/operators';
import { Profile, User, UserService } from 'src/app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profile: Profile;
  currentUser: User;
  isUser: boolean;

  ngOnInit(): void {
    this.route.data
      .pipe(
        concatMap((data: { profile: Profile }) => {
          this.profile = data.profile;
          // Load the current user's data.
          return this.userService.currentUser.pipe(
            tap((userData: User) => {
              this.currentUser = userData;
              this.isUser = this.currentUser.username === this.profile.username;
            })
          );
        })
      )
      .subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
