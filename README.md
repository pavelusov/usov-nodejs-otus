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
2.1 To write a "tree" utility for comfortable display a directory structure. 
    
The utility must accept a mandatory input argument - the path to the directory to display its structure. 
Also it must to understand an option of a display depth(--depth or -d). The option value is number. 
    
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

## 3. Streams of file system
3.1 Run dev

Source file size 100 MB
Constraint 50 MB(generation very long time)

For development the Source file size set up 1 MB
Constraint is 500 KB

0.5 === 500 KB

```
npm run dev -- --max-old-space-size=0.5
```
