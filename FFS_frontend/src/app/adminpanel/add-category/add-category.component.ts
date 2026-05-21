import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CategoryService} from '../../services/category.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-add-category',
  imports: [
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  private categoryService = inject(CategoryService)
  protected message: string = "";

  protected addCategoryForm = new FormGroup({
      "category": new FormControl("", [Validators.required]),
    }
  );

  onAddCategory(){
    if(this.addCategoryForm.valid){
      const categoryName = this.addCategoryForm.get("category")?.value!;
      if(categoryName){
        this.categoryService.addNewCategory(categoryName!)
        this.message = "Nieuwe categorie toegevoegd!"
        this.addCategoryForm.reset();
      }
    }
  }
}
