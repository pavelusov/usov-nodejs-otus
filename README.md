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
View mode with arguments:
```
npm run build
npm start -- arg1 arg2 arg3
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

## 2. CLI utility for working with a file system
2.1 Написать утилиту tree для удобного показа структуры файлов директории. Утилита должна принимать на вход
    обязательный аргумент - путь до директории для показа ее структуры. Также она должна понимать опцию глубину
    показа --depth, -d с числом в качестве значения.
    
```
tree Node.js -d 2
Node.js
├── cluster
│ └── index.js
├── domain
│ ├── error.js
│ ├── flow.js
│ └── run.js
├── errors
│ ├── counter.js
│ └── try-catch.js
└── worker
 └── index.js
```
2.2 Run

Run with a depth
```
npm run build
npm start -- ../ -d 2
```

or 

Run without a depth
```
npm run build
npm start -- ../
```
or

Run with some path
```
npm run build
npm start -- /Users/User/Documents
```
