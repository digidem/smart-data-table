# Smart Data Table

**Under Development** A wrapper for [fixed-data-table](http://facebook.github.io/fixed-data-table/) with [Material Design](https://www.google.com/design/spec/components/data-tables.html) and smart things like responding to container width and height, automatically parsing columns, translating strings, and coercing values.

### Features

This "smart" wrapper for [fixed-data-table](http://facebook.github.io/fixed-data-table/) tries to be smart about how to display data with some opinionated defaults. Uses some components from [material-ui](http://callemall.github.io/material-ui/#/) It avoids managing state in most cases, designed to be used in a wrapper that will add hooks to configuration like columns to display and column resizing and pass new props. Not all these features are implemented yet.

- First opinion: no horizontal scrolling. It will only show a subset of columns based on how many will fit in the width available and minimum column width.
- Parse json or geojson and automatically create columns based on unique keys, including nested values.
- Allow configuration of column order, displayed columns, blacklisted columns (columns that should never display), and column priority (i.e. which columns should be kept as screen size reduces e.g. you have columns `['a','b','c', 'd']`` and you want `a` and `d` to display on smaller screens)
- Integrate with [react-intl](http://formatjs.io/react/) to translate column keys to strings and cell contents.
- Coerce dates (JSON has no date datatype) and localize with formatjs.
- UI to change which columns are displayed - no state: needs plugin hook to respond to changes and pass new props.
- UI for column sorting - managed as state
- UI for column resizing (provided by `fixed-data-table`) - not managed as state, wrapper should add hook and pass column widths.
- Checkboxes to select multiple rows - no state, wrapper should respond to selection, maintain state of selected rows, and add custom action buttons. This may be better as state and action buttons managed within this component?

### Try it out

`git clone https://github.com/digidem/smart-data-table.git`

`npm install`

`npm start`

Visit http://localhost:9966/

### Roadmap

- [x] Make responsive with dynamic height and width from container height and width
- [ ] Style as [Material Design](https://www.google.com/design/spec/components/data-tables.html)
- [ ] Add column sort
- [ ] Add dropdown menus to change columns
- [ ] Add checkboxes to each row
- [ ] Allow row selection & select all
- [ ] Add contextual action buttons on column selection

### Collaboration

Please check out [this issues](https://github.com/digidem/smart-data-table/issues) and join the discussion about how to design this, and feel free to jump in with pull requests. Please assign an issue to yourself if you are going to start working on something, so others know, and remove your assignment if you stop working.


