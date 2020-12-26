import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { EditableArticleResolver } from './editable-article.resolver';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing/editor-routing.module';

@NgModule({
  imports: [SharedModule, EditorRoutingModule],
  declarations: [EditorComponent],
  providers: [EditableArticleResolver],
})
export class EditorModule {}
