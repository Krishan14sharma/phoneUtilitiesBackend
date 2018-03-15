const env = process.env.NODE_ENV;

const development={
  app:{
      port:8080,
      mode:"development"
  }
};

const production={
    app:{
        port:process.env.PORT,
        mode:"production"
    }
};

const config={
    development,production
};

export default config[env];