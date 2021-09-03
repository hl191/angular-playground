import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DummyService} from "./service/dummy.service";
import {Name} from "./service/name";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    form: FormGroup;
    submitted = false;

    private name: Name;

    constructor(private formBuilder: FormBuilder, private dummyService: DummyService) {
    }

    ngOnInit(): void {
        this.dummyService.getName().subscribe(name => this.name = name);
        this.buildForm();
    }

    onSubmit(): void {
        this.submitted = true;

        const submittedValue = this.form.value as Name;
        alert(JSON.stringify(submittedValue, null, 2));
    }

    onReset(): void {
        this.submitted = false;
        this.form.reset();
        this.ngOnInit();
    }

    buildForm(): void {
        this.form = this.formBuilder.group(
            {
                firstName: [this.name.firstName, Validators.required],
                lastName: [this.name.lastName, Validators.required],
            }
        );
    }
}
