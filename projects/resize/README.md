## Table resizer for Angular

## Installation

```sh
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
![Alt Text](https://s1.gifyu.com/images/Basic.gif)

#### True
if `true` Columns change independently of each other
![Alt Text](https://s5.gifyu.com/images/fixed.gif)

## Class 
the resizing-line has `resize-handle`, with which you can change styles