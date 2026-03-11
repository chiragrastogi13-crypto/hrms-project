# from sqlalchemy import create_engine, text
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os
# from dotenv import load_dotenv

# load_dotenv()

# # PostgreSQL connection URL
# # Format: postgresql://user:password@host:port/dbname
# DATABASE_URL = os.getenv(
#     "DATABASE_URL",
#     "postgresql://postgres:12345678@localhost:5432/hrms",  # local fallback
# )

# # For Render/Railway the URL may start with "postgres://" – SQLAlchemy requires "postgresql://"
# if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
#     DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# engine = create_engine(
#     DATABASE_URL,
#     pool_pre_ping=True,       # verify connections before use
#     pool_size=10,             # max persistent connections
#     max_overflow=20,          # extra connections under load
#     pool_recycle=300,         # recycle connections every 5 min
# )

# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# SQLite database file
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./hrms.db"   # local sqlite database
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # required for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()