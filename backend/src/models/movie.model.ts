import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
    imdbId: string;
    title: string;
    year: string;
    genre: string;
    director: string;
    actors: string;
    plot: string;
    poster: string;
    ratings: { source: string; value: string }[];
    imdbRating: string;
    createdAt: Date;
    updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
    {
        imdbId: {
            type: String,
            required: true,
            unique: true
        },
        title: {
            type: String, 
            required: true
        },
        year: { type: String },
        genre: { type: String },
        director: { type: String },
        actors: { type: String },
        plot: { type: String },
        poster: { type: String },
        ratings: [{
            source: String,
            value: String
        }],
        imdbRating: { type: String }
    },
    {
        timestamps: true
    }
);

export const MovieModel = model<IMovie>('Movie', MovieSchema);