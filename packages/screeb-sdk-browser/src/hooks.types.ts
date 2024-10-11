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

export type Message = {
  id: string;
  messagey_size: 100;
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
};

export type HookCommonPropertiesSurvey = HookCommonProperties & {
  survey: Survey;
};

export type HookCommonPropertiesMessage = HookCommonProperties & {
  message: Message;
};

// eslint-disable-next-line no-unused-vars
export type HookOnReady = (data: { channel: Channel; user: User }) => void;

export type HookOnSurveyDisplayAllowed = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey,
) => boolean;

export type HookOnMessageDisplayAllowed = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey,
) => boolean;

export type HookOnSurveyShowed = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  },
) => void;

export type HookOnSurveyStarted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey & {
    response: {
      id: string;
    };
  },
) => void;

export type HookOnSurveyCompleted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  },
) => void;

export type HookOnSurveyHidden = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey & {
    response: {
      id: string;
      items: ResponseItem[];
      hide_reason: ResponseStatus;
    };
  },
) => void;

export type HookOnMessageShowed = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesMessage & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  },
) => void;

export type HookOnMessageStarted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesMessage & {
    response: {
      id: string;
    };
  },
) => void;

export type HookOnMessageCompleted = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesMessage & {
    response: {
      id: string;
      items: ResponseItem[];
    };
  },
) => void;

export type HookOnMessageHidden = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesMessage & {
    response: {
      id: string;
      items: ResponseItem[];
      hide_reason: ResponseStatus;
    };
  },
) => void;

export type HookOnQuestionReplied = (
  // eslint-disable-next-line no-unused-vars
  data: HookCommonPropertiesSurvey & {
    response: {
      id: string;
      status: null;
      question: ResponseItemQuestion;
      answer: ResponseItemAnswer;
      items: ResponseItem[];
    };
  },
) => void;

/** This is the Screeb tag hooks object available on `survey.start` command. */
export type HooksSurveyStart = {
  /** This hook is triggered when a survey is displayed on screen (also triggered when page is reloaded) */
  onSurveyShowed?: HookOnSurveyShowed;
  /** This hook is triggered when a survey is started */
  onSurveyStarted?: HookOnSurveyStarted;
  /** This hook is triggered when a survey is completed */
  onSurveyCompleted?: HookOnSurveyCompleted;
  /** This hook is triggered when a survey is hidden */
  onSurveyHidden?: HookOnSurveyHidden;

  /** This hook is triggered when a question is answered */
  onQuestionReplied?: HookOnQuestionReplied;
};

/** This is the Screeb tag hooks object available on `message.start` command. */
export type HooksMessageStart = {
  /** This hook is triggered when a message is displayed on screen (also triggered when page is reloaded) */
  onMessageShowed?: HookOnMessageShowed;
  /** This hook is triggered when a message is started */
  onMessageStarted?: HookOnMessageStarted;
  /** This hook is triggered when a message is completed */
  onMessageCompleted?: HookOnMessageCompleted;
  /** This hook is triggered when a message is hidden */
  onMessageHidden?: HookOnMessageHidden;

  /** This hook is triggered when a question is answered */
  onQuestionReplied?: HookOnQuestionReplied;
};

/** This is the Screeb tag hooks object available on `init` command. */
export type HooksInit = HooksSurveyStart &
  HooksMessageStart & {
    /** This defines the version of hooks and their data */
    version: string;

    /** This hook is triggered when Screeb SD is loaded, initialized and ready to rock */
    onReady?: HookOnReady;

    /** This hook is triggered before a survey displays to allow it or not. */
    onSurveyDisplayAllowed?: HookOnSurveyDisplayAllowed;
    /** This hook is triggered before a message displays to allow it or not. */
    onMessageDisplayAllowed?: HookOnMessageDisplayAllowed;
  };
