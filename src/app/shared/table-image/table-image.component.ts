import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-table-image',
  templateUrl: './table-image.component.html',
  styles: ``
})
export class TableImageComponent {

  @Input() image?: string;

  imageUrl?: SafeUrl;
  isLoading = true;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer){}

  ngOnInit() {
    if (this.image) {
      this.imageService.getImage(this.image).subscribe({
        next: (img) => {
          this.imageUrl = img;
          this.isLoading = false;
        },
        error: () => {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('../../assets/images/profile/without-image.webp');
          this.isLoading = false;
        }
      });
    } else {
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('../../assets/images/profile/without-image.webp');
      this.isLoading = false;
    }
  }

}
