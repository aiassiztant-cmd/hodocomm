from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "hodocomm API"
    database_url: str = "postgresql+psycopg2://user:pass@localhost:5432/hodocomm"

    class Config:
        env_file = ".env"


settings = Settings()
