CREATE TABLE "public"."work_experiences" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "job_title" Text NOT NULL, "company" Text, "from" date, "to" date, "city" text, "country" text, "description" text, "resume_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_work_experiences_updated_at"
BEFORE UPDATE ON "public"."work_experiences"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_work_experiences_updated_at" ON "public"."work_experiences" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
