import {Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, OnInit, OnChanges} from '@angular/core';
import {isNullOrUndefined} from "util";


@Component({
  selector: 'text-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {


  @Input() elementId: string;
  @Input() value: any = "";
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();

  baseURL: string = '/';

  constructor() {
  }


  ngOnInit() {


  }


  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: this.baseURL + 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


  didSetValue: boolean = false;


  ngOnChanges(){

    console.log(this.value);

    if(!isNullOrUndefined(this.editor) && this.value !== "" && !this.didSetValue){

      console.log(this.value);
      this.didSetValue = true;
      this.editor.setContent(this.value);


    }
  }

}
