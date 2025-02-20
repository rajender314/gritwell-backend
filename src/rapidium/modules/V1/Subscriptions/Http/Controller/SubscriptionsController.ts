import {Request, Response} from 'express';
import BaseController from '@rapCoreBase/Http/BaseController';

import {ClientSubscription}
  from '@basePath/Subscriptions/Commands/ClientSubscription';
import {ClientPauseSubscription}
  from '@basePath/Subscriptions/Commands/ClientPauseSubscription';
import {ClientResumeSubscription}
  from '@basePath/Subscriptions/Commands/ClientResumeSubscription';
import {ClientCancelSubscription}
  from '@basePath/Subscriptions/Commands/ClientCancelSubscription';

import {StripeWebhook}
  from '@basePath/Subscriptions/Commands/StripeWebhook';

import {WebFlowStripeWebhook}
  from '@basePath/Subscriptions/Commands/WebFlowStripeWebhook';

import {CreatePaymentInfo}
  from '@basePath/Subscriptions/Commands/CreatePaymentInfo';

import {AddCard}
  from '@basePath/Subscriptions/Commands/AddCard';
import {GetCards}
  from '@basePath/Subscriptions/Commands/GetCards';
import {UpdateDefaultCard}
  from '@basePath/Subscriptions/Commands/UpdateDefaultCard';


/**
 * class SubscriptionsController
 */
export default class SubscriptionsController extends BaseController {
/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async clientSubscription(req: Request, res: Response, next: any) {
    const clientSubscriptionCommand = new ClientSubscription(req);
    await new BaseController().run(
        clientSubscriptionCommand.path,
        clientSubscriptionCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async clientPauseSubscription(req: Request, res: Response, next: any) {
    const clientPauseSubscriptionCommand = new ClientPauseSubscription(req);
    await new BaseController().run(
        clientPauseSubscriptionCommand.path,
        clientPauseSubscriptionCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async clientResumeSubscription(req: Request, res: Response, next: any) {
    const clientResumeSubscriptionCommand = new ClientResumeSubscription(req);
    await new BaseController().run(
        clientResumeSubscriptionCommand.path,
        clientResumeSubscriptionCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async clientCancelSubscription(req: Request, res: Response, next: any) {
    const clientCancelSubscriptionCommand = new ClientCancelSubscription(req);
    await new BaseController().run(
        clientCancelSubscriptionCommand.path,
        clientCancelSubscriptionCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async createPaymentInfo(req: Request, res: Response, next: any) {
    const createPaymentInfoCommand = new CreatePaymentInfo(req);
    await new BaseController().run(
        createPaymentInfoCommand.path,
        createPaymentInfoCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async stripeWebhook(req: Request, res: Response, next: any) {
    const stripeWebhookCommand = new StripeWebhook(req);
    await new BaseController().run(
        stripeWebhookCommand.path,
        stripeWebhookCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async webFlowStripeWebhook(req: Request, res: Response, next: any) {
    const WebFlowStripeWebhookCommand = new WebFlowStripeWebhook(req);
    await new BaseController().run(
        WebFlowStripeWebhookCommand.path,
        WebFlowStripeWebhookCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async addCard(req: Request, res: Response, next: any) {
    const addCardCommand = new AddCard(req);
    await new BaseController().run(
        addCardCommand.path,
        addCardCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async getCards(req: Request, res: Response, next: any) {
    const getCardsCommand = new GetCards(req);
    await new BaseController().run(
        getCardsCommand.path,
        getCardsCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }

  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 */
  async updateDefaultCard(req: Request, res: Response, next: any) {
    const updateDefaultCardCommand = new UpdateDefaultCard(req);
    await new BaseController().run(
        updateDefaultCardCommand.path,
        updateDefaultCardCommand,
        res,
        true,
        false,
        next,
        req,
    );
  }
}
