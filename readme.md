For Lab Mongoose Express Recipes convert it so we use relationships
You should have 2 models: Recipes and Chef
In the Recipe Schema have the same fields but add a chef field:
title - Type String. It should be required and unique.
instructions - Type String. It should be required.
level - Type String. It can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (use the enum validator :zwinkern:).
ingredients - Type Array of Strings - represented as [ String ].
image - Type String. Default value: "https://images.media-allrecipes.com/images/75131.jpg".
duration - Type Number. The minimum value should be 0.
isArchived - Type Boolean. The default value should be false.
created - Type Date. By default, today.
chef: Type ObjectId . that references the chef model
The chef model should have the following Schema:
name- Type String.
hasPublishedRecipes- Type Boolean. The default value should be false.
recipes: Type  Array of ObjectId . that references the recipes model
in these models we have a Many to One relation with the Chef to Recipes
Create the get and post routes for a new Chef
In the already created routes for recipes add the Chef id to the chef field.
In all the get routes for the recipes populate the chef field
Finally in the posting of the new Recipe we need to make sure that after we add the ObjectId of the chef to the recipes we also add the ObjectId of the recipe to the chef document