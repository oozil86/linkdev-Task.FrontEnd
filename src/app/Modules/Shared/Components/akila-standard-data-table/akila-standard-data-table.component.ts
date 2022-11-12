import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AppConfig } from '../../../../app.config';
import { EnumTypes } from '../../Enums/EnumTypes';

@Component({
  selector: 'app-akila-standard-data-table',
  templateUrl: './akila-standard-data-table.component.html',
})
export class AkilaStandardDataTableComponent implements OnInit {

  @Input() datasource: any[]=[];
  @Input() cols: any[];
  @Input() loading: boolean = true;
  @Input() IsEditable: boolean = true;
  @Input() EditRow: boolean = true;
  @Input() DeleteRow: boolean = true;
  @Input() LazyLoading: boolean = true;
  @Input() totalRecords: number;
  @Input() first: number = 0;
 
  Type = EnumTypes.Boolean;
  RowCounter = AppConfig.settings.PageSize;
  @Output('EntityEdit') EntityEdit = new EventEmitter<{ entity: any }>();
  @Output('EntityDelete') EntityDelete = new EventEmitter<{ entity: any }>();
  @Output('EntitiesLoad') EntitiesLoad = new EventEmitter<any>();
 

  
  constructor() {

  }

  ngOnInit(): void {
  }


  OnEdit(rowData: any) {
    this.EntityEdit.emit({
      entity: rowData,
    });
  }

  OnDelete(rowData: any) {
    this.EntityDelete.emit({
      entity: rowData,
    });
  }



  loadItems(LazyLoadEvent: LazyLoadEvent) {
    this.EntitiesLoad.emit(LazyLoadEvent);
  }

}

