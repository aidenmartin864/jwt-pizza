# Github Actions Curiosity Report - Aiden Martin

For my curiosity report, I chose to look more into GitHub Actions. Throughout the course, the CI pipeline was a point of struggle for me. 
I had a hard time telling exactly what all the commands in it were supposed to do. There were so many indents and keywords that I just
didn't understand. I took the time to watch a video tutorial about specifics for GitHub Actions that helped a lot.

## What is GitHub Actions?
Though we used Actions for a CI pipeline, Actions is not exclusively a CI pipeline tool. It is a general automation tool that just so
happens to be used often for CI/CD pipelines. The basic gist is that an event occcurs within the repository, and a set of commands
is executed. The trigger events can be a variety of things, including: Someone joining, a pull request is made, a new commit is pushed,
a new issue is added, etc. I spent more time later getting into the commands that can be executed in response. Actions is an insanely
helpful tool because it can accomplish what used to require many additional third party services within the same place that the code is
stored, versioned, etc. I also learned that when setting up an Actions workflow, there are a variety of premade templates that you can
use for common automation tasks.

## Syntax
### on:
  This keyword is used to specify the event trigger. Below this command, a name for a repository event can be named and a respository 
  branch can be specified. This event is what triggers the workflow.
### jobs:
  This keyword groups a set of custom-named actions that will be executed. 
  Each of these jobs will run on a different virtual 
  environment from one another somewhere within the GitHub Actions Runner on the GitHub servers.
  By default, these jobs will run in parallel, but the "needs:" keyword can be used to imply a reliance on a previous job, ensuring that
  the related jobs will run in sequence.

## The actions/ library
actions/ is a built-in library that the Actions developers created to implement common actions within a workflow. I took the time to look into
some key or just generally interesting repositories within the actions/ library.

### checkout
Key action that essentially grabs the repository code to be worked on. It gains access to the code and maintains this access for the entirety of the workflow.
Pretty much every single Actions workflow will use this one.

### setup-java
This is a self-explanatory one. It installs Java in the server environment that the workflow is running on and uses it to set up the code within the repository.
There are a variety of "setup" actions for different languages within the actions/ library, but interestingly, I noticed that there is not one for C++ or C. I assume this is because
these languages are used less often for large-scale applications or web development projects, but I'm not sure. This could be worth looking into further.

### ai-inference
Something I certainly want to look more into at some point is GitHub Models. This is some kind of tool that allows for AI models to be used within GitHub-hosted projects.
The ai-inference action gives access to these AI Models, but I'm not exactly sure of the implications or capabilities of that part of GitHub.

### labeler
Quite simply, labels for pull requests can be automatically created and given labels with numbers, names, etc. each time one is made.

### humans.txt
This was a fun little easter egg to find. Essentially, actions/humans.txt is just a .txt file that lists out the names of the people who work on the GitHub Actions team.
It didn't take long for me to find this, and I'm sure there's a ton of other secrets like this hidden all across GitHub's built-in libraries.

## Conclusion
I'm glad I looked into GitHub Actions more. Even from just a short dive into the rabbit hole, I feel much more confident in using Actions for future personal/work projects.
When an employer wants me to help set up automation, I can at least have a foothold and a solid base understanding of how Actions works and how I can use it from scratch. This report has also
shown me the depth that everything involved with DevOps has. Just from some surface-level digging, I found 2 entirely separate rabbit holes that I want to look into.
This was a surprisingly fun and easy thing to research, and I still have so much more to learn. Luckily, I know it won't be as hard as I thought to get more information and
actually learn how to apply it myself.
