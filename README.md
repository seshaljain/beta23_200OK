# 200OK
## Version Beta 5.0

## Team Members:

1. Arnav Dixit
2. Gyanendra Shukla
3. Seshal Jain

## Branches

- Frontend
    - `front` --> frontend codebase
    - `front/f/*` --> feature branches
- Backend
    - `back` --> backend codebase
    - `back/f/*` --> feature branches
    
## Setup Instructions

To start both the frontend and backend server follow these instructions to checkout both branches and start the server:

```sh
mkdir 200OK
cd 200OK
git clone git@github.com:seshaljain/beta23_200OK # use https if preferred
cd beta23_200OK # cd into the cloned folder

git worktree add ../front front # frontend
git worktree add ../back back # backend

cd ..
```

Make sure you have the appropriate `.env` in the root folder of the respective branch

