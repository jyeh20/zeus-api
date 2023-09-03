from os import system
from os.path import realpath, dirname

GIT_HOOKS = "../.git/hooks"
this_file = realpath(dirname(__file__))

with open(f"{this_file}/{GIT_HOOKS}/pre-commit", "w") as pre_commit:
  pre_commit.writelines(
    ["echo Running pre-commit hook\n",
     "echo \nRunning npm run test\n\n",
     "npm run test\n"]
  )

with open(f"{this_file}/{GIT_HOOKS}/pre-push", "w") as pre_push:
  pre_push.writelines([
    "echo Running pre-push hook\n",
    "echo '\\nRunning git gc --aggressive\\n'\n"
    "git gc --aggressive\n",
    "echo '\\nRunning git remote prune origin\\n'\n"
    "git remote prune origin\n"
  ])

system(f"chmod ug+x {this_file}//../.git/hooks/*")