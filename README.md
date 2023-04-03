## Table resizer for Angular

## Installation

```
npm install ngpq-table-resize
```

## Usage example
Just need to add `tableResiaze` directive to the table
```html
<table tableResize>
    ...
</table>
```
app.module.ts
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { ResizeModule } from 'ngpq-table-resize';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ResizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Inputs
fixed: Default `false`
#### False
If `false` changes its own and its neighbor column width
#### True
If `true` columns change independently of each other
## Class
the resizing-line has `resize-handle` class name, with which you can change the styles
