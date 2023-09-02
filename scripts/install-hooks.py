from os import system
from os.path import realpath, dirname

this_file = realpath(dirname(__file__))

with open(f"{this_file}/../.git/hooks/pre-commit", "w") as pre_commit:
  pre_commit.writelines(
    ["echo Running pre-commit hook\n",
     "npm run test\n"]
  )

system(f"chmod ug+x {this_file}//../.git/hooks/*")