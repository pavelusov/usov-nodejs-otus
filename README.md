# Course of NodeJS from Otus.ru

## Instructions for modes
Development mode:
```
npm run dev
```

View mode:
```
npm run build
npm start
```

## 1. Creating an NPM package to display the tree
1.1 Write a function for displaying a tree structure

```JSON
{
 "name": 1,
 "items": [
  {
    "name": 2,
    "items": [{ "name": 3 }, { "name": 4 }]
  }, 
  {
    "name": 5,
    "items": [{ "name": 6 }]
  }]
}
```

1.2 An example of running

```
npm start
1
├── 2
│ └── 3
│ └── 4
└── 5
  └── 6
```
