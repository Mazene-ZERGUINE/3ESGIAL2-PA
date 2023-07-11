--
-- PostgreSQL database dump
--

-- Dumped from database version 13.10
-- Dumped by pg_dump version 15.2 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: mmazenezerguine
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO mmazenezerguine;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    title character varying(255),
    desciption text
);


ALTER TABLE public.categories OWNER TO psql;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO psql;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: categories_members; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.categories_members (
    id integer NOT NULL,
    id_project integer,
    id_member integer
);


ALTER TABLE public.categories_members OWNER TO psql;

--
-- Name: categories_members_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.categories_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_members_id_seq OWNER TO psql;

--
-- Name: categories_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.categories_members_id_seq OWNED BY public.categories_members.id;


--
-- Name: client_user; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.client_user (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    role character varying NOT NULL
);


ALTER TABLE public.client_user OWNER TO psql;

--
-- Name: client_user_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.client_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_user_id_seq OWNER TO psql;

--
-- Name: client_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.client_user_id_seq OWNED BY public.client_user.id;


--
-- Name: memebers_tasks; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.memebers_tasks (
    id integer NOT NULL,
    user_id integer,
    task_id integer
);


ALTER TABLE public.memebers_tasks OWNER TO psql;

--
-- Name: memebers_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.memebers_tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memebers_tasks_id_seq OWNER TO psql;

--
-- Name: memebers_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.memebers_tasks_id_seq OWNED BY public.memebers_tasks.id;


--
-- Name: memeberstasks; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.memeberstasks (
    id integer NOT NULL,
    user_id integer,
    task_id integer
);


ALTER TABLE public.memeberstasks OWNER TO psql;

--
-- Name: memeberstasks_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.memeberstasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memeberstasks_id_seq OWNER TO psql;

--
-- Name: memeberstasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.memeberstasks_id_seq OWNED BY public.memeberstasks.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.tasks (
    taskid integer NOT NULL,
    label character varying(60),
    category_id integer,
    description text,
    status character varying(25),
    deadline date,
    start_at date,
    created_at date,
    updated_at date,
    members text
);


ALTER TABLE public.tasks OWNER TO psql;

--
-- Name: tasks_taskid_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.tasks_taskid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_taskid_seq OWNER TO psql;

--
-- Name: tasks_taskid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.tasks_taskid_seq OWNED BY public.tasks.taskid;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: psql
--

CREATE TABLE public.tickets (
    ticket_id integer NOT NULL,
    project_id integer,
    members character varying,
    status character varying,
    description character varying,
    tag character varying,
    author character varying,
    ticket_title character varying
);


ALTER TABLE public.tickets OWNER TO psql;

--
-- Name: tickets_ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: psql
--

CREATE SEQUENCE public.tickets_ticket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_ticket_id_seq OWNER TO psql;

--
-- Name: tickets_ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: psql
--

ALTER SEQUENCE public.tickets_ticket_id_seq OWNED BY public.tickets.ticket_id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: categories_members id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.categories_members ALTER COLUMN id SET DEFAULT nextval('public.categories_members_id_seq'::regclass);


--
-- Name: client_user id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.client_user ALTER COLUMN id SET DEFAULT nextval('public.client_user_id_seq'::regclass);


--
-- Name: memebers_tasks id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.memebers_tasks ALTER COLUMN id SET DEFAULT nextval('public.memebers_tasks_id_seq'::regclass);


--
-- Name: memeberstasks id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.memeberstasks ALTER COLUMN id SET DEFAULT nextval('public.memeberstasks_id_seq'::regclass);


--
-- Name: tasks taskid; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.tasks ALTER COLUMN taskid SET DEFAULT nextval('public.tasks_taskid_seq'::regclass);


--
-- Name: tickets ticket_id; Type: DEFAULT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.tickets ALTER COLUMN ticket_id SET DEFAULT nextval('public.tickets_ticket_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.categories (id, title, desciption) FROM stdin;
180	JAVAFX project	application de gestion de projet en javafx \n(cette application)
183	Mini langage 	langage de web scrapping
181	Angular application	application d'échanage et de done des biens utilisé
182	NodeJS api	Expresse api
184	Linux dev project	serveur ubunut 20.04\nzsh\nfirwall\npostgreSQl 12 \napache2 server
\.


--
-- Data for Name: categories_members; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.categories_members (id, id_project, id_member) FROM stdin;
16	58	10
21	61	9
20	61	8
22	61	10
23	62	8
25	62	10
24	62	9
26	63	9
27	64	10
28	65	10
33	68	1
34	68	8
40	59	9
41	59	10
42	66	9
43	66	10
44	60	9
45	60	10
47	69	10
46	69	9
48	70	1
49	70	9
56	73	8
57	73	11
58	73	10
64	74	8
65	74	11
66	72	8
67	72	10
68	71	1
69	71	8
70	71	9
71	71	10
72	71	11
73	75	10
74	75	9
75	76	1
76	76	8
77	76	10
78	76	9
79	81	10
80	180	69
81	180	72
82	183	69
83	183	75
84	181	70
85	182	70
86	182	72
87	182	75
88	184	69
89	184	70
\.


--
-- Data for Name: client_user; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.client_user (id, email, password, first_name, last_name, created_at, updated_at, role) FROM stdin;
66	admin@email.fr	$argon2id$v=19$m=65536,t=3,p=4$nXCm/eNJ+/RUHQVB2dEOSw$zybOJVJ5vsp1m7blqwrbdPorWnwmg6bC1jQbK7amjUA	admin	admin	2023-07-10	\N	ADMIN
69	mmazenezerguine@email.com	$argon2id$v=19$m=65536,t=3,p=4$hvv1amiW3ANOs5/slLhjcw$L82rly82PXhGsKonlVPJxa2Rcq+NQ1xEcteINfXo0VM	Mazene	ZERGUINE	2023-07-10	\N	DEV
70	z@email.fr	$argon2id$v=19$m=65536,t=3,p=4$kO7HeT7rDkHtxrbDHtGSog$4j5yrBRUcsw0UdGa6LG2iNQdaOGgq6aSiv52/lQK3MI	Loic	ZHU	2023-07-10	\N	DEV
72	dev1@email.fr	$argon2id$v=19$m=65536,t=3,p=4$piCCiO3snNFAubVUEt7AgA$8w6E1xFJQvD5td0AekaZMZ2AaiXF/bYXFVD2brrGE9A	dev1	dev1	2023-07-10	\N	DEV
75	dev2@email.fr	$argon2id$v=19$m=65536,t=3,p=4$OMORTgxDxbSpjWxP7GwV6A$SefsuXHU0tTS1cprIWeoxWSVhgu1zJ851cAoXN4L3jw	dev2	dev2	2023-07-10	2023-07-10	DEV
\.


--
-- Data for Name: memebers_tasks; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.memebers_tasks (id, user_id, task_id) FROM stdin;
1	1	1
2	2	1
3	2	2
\.


--
-- Data for Name: memeberstasks; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.memeberstasks (id, user_id, task_id) FROM stdin;
1	1	3
2	1	4
3	2	4
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.tasks (taskid, label, category_id, description, status, deadline, start_at, created_at, updated_at, members) FROM stdin;
37	mis en ligne de la bdd	184	base de donnée postgreSQl 12 \nuser weakly \nbdd weakly-news	BLOQUE	2023-08-03	2023-07-16	2023-07-10	2023-07-10	Mazene\nLoic\n
34	ZSH	184	installation du theme haribo	EN COURS	2023-07-23	2023-07-15	2023-07-10	2023-07-10	Loic\n
33	mis en place du serveur	184	installation ubuntu serveur 20.04 \ncréation de la VM \ncréation du fichier authores.txt	VERIFIE	2023-07-11	2023-07-11	2023-07-10	2023-07-10	Mazene\nLoic\n
39	firewall	184	ufw	BLOQUE	2023-08-27	2023-08-02	2023-07-10	2023-07-10	Loic\n
45	SSH	184	connexion ssh user modo	A FAIRE	2023-09-11	2023-07-28	2023-07-10	\N	Loic\n
46	SFTP 	184		A FAIRE	2023-09-20	2023-08-09	2023-07-10	2023-07-10	Mazene\n
35	configuration du réseau de la vm 	184		EN COURS	2023-07-13	2023-07-11	2023-07-10	2023-07-10	Mazene\n
48	articles controller	182		A FAIRE	2023-08-22	2023-07-22	2023-07-10	\N	dev1\n
47	users controller	182	création des utilisateurs\nmodification des utiliséateur \nget request	A FAIRE	2023-07-27	2023-07-10	2023-07-10	2023-07-10	Loic\ndev1\n
49	main controller	182	main page	A FAIRE	2023-09-10	2023-08-16	2023-07-10	2023-07-10	dev1\n
50	models	182	users \npublication\narticles\nsignalement	EN COURS	2023-07-26	2023-07-14	2023-07-10	2023-07-10	Loic\n
51	Auth service	182		BLOQUE	2023-10-09	2023-09-05	2023-07-10	2023-07-10	Loic\n
52	JAVA	185	java app 	A FAIRE	2023-07-29	2023-07-10	2023-07-10	2023-07-10	Mazene\ndev2\n
53	angular app	185		A FAIRE	2023-07-28	2023-07-12	2023-07-12	2023-07-10	Mazene\nLoic\n
38	environement android	184	adb\njava\nsdk	TERMINE	2023-07-25	2023-07-14	2023-07-10	2023-07-10	Mazene\n
54	grammaire	183	création des grammaire du langage	A FAIRE	2023-07-28	2023-07-11	2023-07-10	\N	Mazene\ndev2\n
36	configuration apcahe	184		A FAIRE	2023-07-18	2023-07-13	2023-07-10	\N	Loic\n
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: psql
--

COPY public.tickets (ticket_id, project_id, members, status, description, tag, author, ticket_title) FROM stdin;
4	184	Mazene\nLoic\n	EN COURS		Aide	admin	toto
5	182	Mazene\n	BLOQUE	BUG	BUG	dev2	new ticket
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.categories_id_seq', 185, true);


--
-- Name: categories_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.categories_members_id_seq', 89, true);


--
-- Name: client_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.client_user_id_seq', 76, true);


--
-- Name: memebers_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.memebers_tasks_id_seq', 3, true);


--
-- Name: memeberstasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.memeberstasks_id_seq', 3, true);


--
-- Name: tasks_taskid_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.tasks_taskid_seq', 54, true);


--
-- Name: tickets_ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: psql
--

SELECT pg_catalog.setval('public.tickets_ticket_id_seq', 5, true);


--
-- Name: categories_members categories_members_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.categories_members
    ADD CONSTRAINT categories_members_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: client_user client_user_email_key; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.client_user
    ADD CONSTRAINT client_user_email_key UNIQUE (email);


--
-- Name: client_user client_user_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.client_user
    ADD CONSTRAINT client_user_pkey PRIMARY KEY (id);


--
-- Name: memebers_tasks memebers_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.memebers_tasks
    ADD CONSTRAINT memebers_tasks_pkey PRIMARY KEY (id);


--
-- Name: memeberstasks memeberstasks_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.memeberstasks
    ADD CONSTRAINT memeberstasks_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (taskid);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: psql
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: mmazenezerguine
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

