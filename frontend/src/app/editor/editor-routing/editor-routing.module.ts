import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';
import { AuthGuardService } from 'src/app/core';
import { EditableArticleResolver } from '../editable-article.resolver';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      article: EditableArticleResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
