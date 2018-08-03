const Alexa = require('ask-sdk-core');

// ----------------------------------------

const { SKILL_ID } = process.env;

const STOP_MESSAGE = 'ストップします。';

const REPROMPT = '○○○を言ってください。'; // TODO
const HELP_MESSAGE = `このスキルでは、○○○します。${REPROMPT}`; // TODO AMAZON.HelpIntent.

const LAUNCH_MESSAGE = `○○○へようこそ。${REPROMPT}`; // TODO LaunchRequest.

const EMPTY_SLOT_REPROMPT = `もう一度、${REPROMPT}`;
const EMPTY_SLOT = `○○○するには、○○○のような形で話しかけてください。${EMPTY_SLOT_REPROMPT}`; // TODO

const SLOT_FAILED = `すみません、変換できませんでした。${EMPTY_SLOT_REPROMPT}`;

const SUCCESS_REPROMPT = '他に○○○する○○○を言ってください。';

// ----------------------------------------
// 共通処理.

// ----------------------------------------
// メイン処理.

// TODO
const mainProcess = async (handlerInput, params) => {
  // TODO 処理
  const response = '';

  if (false) { // TODO 失敗時の条件
    return handlerInput.responseBuilder
      .speak(SLOT_FAILED)
      .reprompt(EMPTY_SLOT_REPROMPT)
      .getResponse(); // 継続
  }

  return handlerInput.responseBuilder
    .speak() // TODO 成功時のメッセージ
    .reprompt(SUCCESS_REPROMPT)
    .withSimplecard(params, response)
    .getResponse(); // 継続
};

// ----------------------------------------

/** 起動時 */
const LaunchHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(LAUNCH_MESSAGE)
      .reprompt(REPROMPT)
      .getResponse(); // 継続
  },
};

/** 主なHandlerの処理. */
const YourHandler = {
  canHandle(handlerInput) {
    // IntentRequest && query
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'your-intent-name';
  },
  async handle(handlerInput) {
    // TODO 【スロットの値チェック】
    const スロット = handlerInput.requestEnvelope.request.intent.slots.スロット.value;
    if (!スロット) {
      return handlerInput.responseBuilder
        .speak(EMPTY_SLOT)
        .reprompt(EMPTY_SLOT_REPROMPT)
        .getResponse(); // 継続
    }
    // TODO 【メイン処理】
    return mainProcess(handlerInput, スロット);
  },
};

/** AMAZON.CancelIntent || AMAZON.StopIntent */
const CancelAndStopHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
           && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  async handle(handlerInput) {
    return handlerInput.responseBuilder.speak(STOP_MESSAGE).getResponse(); // 終了
  },
};

/** AMAZON.HelpIntent */
const HelpHandler = {
  canHandle() { // canHandle(handlerInput) {
    return true;
    // return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
    //        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  async handle(handlerInput) {
    return handlerInput.responseBuilder.speak(HELP_MESSAGE).reprompt(REPROMPT).getResponse(); // 継続
  },
};

/** Keep instance */
let skill;

/** main */
exports.handler = async (event) => {
  // console.log(JSON.stringify(event));
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchHandler,
        YourHandler,
        CancelAndStopHandler,
        HelpHandler,
      ).withSkillId(SKILL_ID).create();
  }
  return skill.invoke(event);
};
