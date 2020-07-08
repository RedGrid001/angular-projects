import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  typedocument: string;
  numberdocument: string;
  position: string;
  fullname: string;
  question: boolean;
}

@Component({
  selector: 'app-model-funcionario',
  templateUrl: './model-funcionario.component.html',
  styleUrls: ['./model-funcionario.component.css']
})
export class ModelFuncionarioComponent implements OnInit {

  typedocument: string;
  numberdocument: string;
  position: string;
  fullname: string;
  question: boolean;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFuncionarioDialogComponent, {
      width: '400px',
      data: {typedocument: '', numberdocument: '', position: '', fullname: '', question: ''}
    });
    console.log("Inicio");
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.typedocument = result.animal;
      this.numberdocument = result.peso;
      this.position = result.position;
      this.fullname = result.fullname;
      this.question = result.question;
      console.log('Fin: '+result);
    });
  }
}

@Component({
  selector: 'modal-funcionario-dialog.component',
  templateUrl: './modal-funcionario-dialog.component.html',
  styleUrls: ['./model-funcionario.component.css']
})

export class ModalFuncionarioDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalFuncionarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
