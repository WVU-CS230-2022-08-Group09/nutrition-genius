export class view_all_recipes_model {
    name: string
    meal_type: string
    servings: number
    image:string
    //ingredients: string

    constructor(name: string, meal_type: string, servings: number,  image:string) {
        this.name = name;
        this.meal_type = meal_type;
        this.servings = servings;
        //this.ingredients = ingredients;
        this.image = image;
    }
}