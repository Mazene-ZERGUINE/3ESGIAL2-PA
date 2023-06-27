import { CoreController } from './Core.controller';
import { Request, Response } from 'express';
import { Session } from '../../models/clm/session';
import { Status } from '../../enum/clm/status.enum';
import { Utilisateur } from '../../models/clm/utilisateur';
import { Categorie } from '../../models/clm/categorie';
import { Publication } from '../../models/clm/publication';
import { Image } from '../../models/clm/image';
import { Commentaire } from '../../models/clm/commentaire';
import fs from 'fs';

export class CommentaireController extends CoreController {}
