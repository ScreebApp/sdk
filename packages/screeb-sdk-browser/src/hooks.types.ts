export type ChannelType = "widget" | "ios" | "android";

export type Channel = {
  id: string;
  type: ChannelType;
};

export type User = {
  anonymous_id: string;
  userId?: string;
};

export type SurveyFormat = "conversationnal" | "cards";

export type SurveySize = 25 | 50 | 75 | 100 | 125 | 150;

export type SurveyPosition =
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Survey = {
  id: string;
  survey_position: SurveyPosition;
  survey_format: SurveyFormat;
  survey_size: 100;
};

export type ResponseStatus =
  | "displayed"
  | "started"
  | "ended"
  | "closed"
  | "interrupted";

export type ResponseItemQuestion = {
  id: string;
  title: string;
  type: "text" | "video";
  url?: string;
};

export type ResponseItemAnswer = {
  replied_at?: string;
  fields?: {
    type: "string" | "number" | "boolean" | "none" | "time" | "file";
    text?: string;
    number?: number;
    boolean?: boolean;
    time?: string;
  }[];
};

export type ResponseItem = {
  question: ResponseItemQuestion;
  answer: ResponseItemAnswer;
};

export type HookCommonProperties = {
  channel: Channel;
  user: User;
  survey: Survey;
};

// eslint-disable-next-line no-unused-vars
export type HookOnReady = (data: { channel: Channel; user: User }) => void;

export type HookOnSurveyShowed = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonProperties & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  }
) => void;

export type HookOnSurveyStarted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonProperties & {
    response: {
      id: string;
    };
  }
) => void;

export type HookOnQuestionReplied = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonProperties & {
    response: {
      id: string;
      status: null;
      question: ResponseItemQuestion;
      answer: ResponseItemAnswer;
      items: ResponseItem[];
    };
  }
) => void;

export type HookOnSurveyCompleted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonProperties & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  }
) => void;

export type HookOnSurveyHidden = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonProperties & {
    response: {
      id: string;
      items: ResponseItem[];
      hide_reason: ResponseStatus;
    };
  }
) => void;
