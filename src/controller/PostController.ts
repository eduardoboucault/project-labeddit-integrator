import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { CreatePostSchema } from "../dtos/postDTO/createPost.dto";
import { GetPostSchema } from "../dtos/postDTO/getPosts.dto";
import { ZodError } from "zod";
import { BaseError } from "../erros/BaseError";
import { VotePostSchema } from "../dtos/postDTO/votePost.dto";


export class PostController {

    constructor(
        private postBusiness: PostBusiness
    ) { }

    public createPost = async (req: Request, res: Response) => {

        try {

            const input = CreatePostSchema.parse({
                token: req.headers.authorization,
                content: req.body.content
            });

            const output = await this.postBusiness.createPost(input);

            res.status(201).send(output);

        } catch (error) {

            console.log(error);

            if (error instanceof ZodError) {

                res.status(400).send(error.issues)

            } else if (error instanceof BaseError) {

                res.status(error.statusCode).send(error.message)

            } else {

                res.status(500).send("Erro inesperado")
            }
        }
    }

    public getPosts = async (req: Request, res: Response) => {

        try {

            const input = GetPostSchema.parse({
                token: req.headers.authorization,
            })

            const result = await this.postBusiness.getPosts(input);

            res.status(200).send(result);

        } catch (error) {

            console.log(error);

            if (error instanceof ZodError) {

                res.status(400).send(error.issues)

            } else if (error instanceof BaseError) {

                res.status(error.statusCode).send(error.message)

            } else {

                res.status(500).send("Erro inesperado")
            }
        }

    }

    public getPostById = async (req: Request, res: Response) => {
        try {

        } catch (error) {

            console.log(error);

            if (error instanceof ZodError) {

                res.status(400).send(error.issues)

            } else if (error instanceof BaseError) {

                res.status(error.statusCode).send(error.message)

            } else {

                res.status(500).send("Erro inesperado")
            }
        }
    }

    public votePost = async (req: Request, res: Response) => {

        try {

            const input = VotePostSchema.parse({
                token: req.headers.authorization,
                postId: req.params.id,
                vote: req.body.vote
            });

            const response = await this.postBusiness.votePost(input);

            res.status(200).send(response);

        } catch (error) {

            console.log(error);

            if (error instanceof ZodError) {

                res.status(400).send(error.issues)

            } else if (error instanceof BaseError) {

                res.status(error.statusCode).send(error.message)

            } else {

                res.status(500).send("Erro inesperado")
            }
        }
    }
}