// import {addPopularityScore} from './popularityScore';
import { ListingInterface } from '../../models/ListingObj/Listing';
import { RecommendationInterface } from '../interface';

export const addTotalScore = (
    allTasks: {[name: string]: ListingInterface}, 
    recommendations: {[name: string]: RecommendationInterface[]}) => {

    return recommendations
}