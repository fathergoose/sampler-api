\restrict dbmate

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sample_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sample_files (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    path character varying(255)
);


--
-- Name: sample_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sample_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sample_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sample_files_id_seq OWNED BY public.sample_files.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: sound_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sound_files (
    id integer NOT NULL,
    name text,
    path text
);


--
-- Name: sound_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sound_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sound_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sound_files_id_seq OWNED BY public.sound_files.id;


--
-- Name: sample_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sample_files ALTER COLUMN id SET DEFAULT nextval('public.sample_files_id_seq'::regclass);


--
-- Name: sound_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sound_files ALTER COLUMN id SET DEFAULT nextval('public.sound_files_id_seq'::regclass);


--
-- Name: sample_files sample_files_path_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sample_files
    ADD CONSTRAINT sample_files_path_key UNIQUE (path);


--
-- Name: sample_files sample_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sample_files
    ADD CONSTRAINT sample_files_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sound_files sound_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sound_files
    ADD CONSTRAINT sound_files_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict dbmate


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20260326173633');
