import {
  Mutation,
  Arg,
  Resolver,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Movie } from "../entity/Movie";

// create an InputType when you have many inputs(id, title, minutes, ...etc)
// @Arg("title") title: string,
// @Arg("minutes", () => Int) minutes: number
// await Movie.insert({ title, minutes });
@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

// Allow specifying only one field when updating
@InputType()
class MovieInputUpdate {
  @Field(() => String, { nullable: true })
  title?: string; // doesn't like input of null, so use "undefined"

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  // CRUD methods

  // CREATE
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    // await Movie.insert(options);
    const movie = await Movie.create(options).save(); // in typeORM, this does 2 SQL command, INSERT and SELECT
    return movie;
  }

  // UPDATE
  // MovieInput specifies that we have to supply both title and minutes
  // A workaround is to create a separate MovieInput for optional inputs upon UPDATE+SELECT
  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieInputUpdate) input: MovieInputUpdate
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  // DELETE
  // specify the return value of the resolver
  @Mutation(() => Boolean)
  // create resolver and arguments it takes
  async deleteMovie(
    @Arg("id", () => Int)
    id: number
  ) {
    // DB logic
    await Movie.delete({ id });
    return true;
  }

  // READ
  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
}
