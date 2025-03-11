--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

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

--
-- Name: ChatType; Type: TYPE; Schema: public; Owner: bask
--

CREATE TYPE public."ChatType" AS ENUM (
    'private',
    'group'
);


ALTER TYPE public."ChatType" OWNER TO bask;

--
-- Name: NotificationStatus; Type: TYPE; Schema: public; Owner: bask
--

CREATE TYPE public."NotificationStatus" AS ENUM (
    'WAITING',
    'SENT',
    'READ'
);


ALTER TYPE public."NotificationStatus" OWNER TO bask;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: bask
--

CREATE TYPE public."Status" AS ENUM (
    'PENDING',
    'ACCEPTED',
    'REJECTED'
);


ALTER TYPE public."Status" OWNER TO bask;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Admin; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Admin" (
    id integer NOT NULL,
    first_name text,
    last_name text,
    email text NOT NULL,
    phone_num text,
    password text,
    joined_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_active_at timestamp(3) without time zone,
    last_deactive_at timestamp(3) without time zone,
    superadmin boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Admin" OWNER TO bask;

--
-- Name: Admin_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Admin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Admin_id_seq" OWNER TO bask;

--
-- Name: Admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Admin_id_seq" OWNED BY public."Admin".id;


--
-- Name: Book_mark_Post; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Book_mark_Post" (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Book_mark_Post" OWNER TO bask;

--
-- Name: Book_mark_Post_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Book_mark_Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Book_mark_Post_id_seq" OWNER TO bask;

--
-- Name: Book_mark_Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Book_mark_Post_id_seq" OWNED BY public."Book_mark_Post".id;


--
-- Name: Cart; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Cart" (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Cart" OWNER TO bask;

--
-- Name: Cart_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Cart_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cart_id_seq" OWNER TO bask;

--
-- Name: Cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Cart_id_seq" OWNED BY public."Cart".id;


--
-- Name: Chat_rooms; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Chat_rooms" (
    _id text NOT NULL,
    type public."ChatType" NOT NULL,
    participants integer[],
    group_name text,
    group_image text,
    "adminId" integer,
    last_message text,
    last_message_time timestamp(3) without time zone,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    on_call boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Chat_rooms" OWNER TO bask;

--
-- Name: Class_V; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Class_V" (
    id integer NOT NULL,
    "languageOfClass" text,
    trainer_id integer NOT NULL,
    date jsonb,
    title text,
    description text,
    "trainerBio" text,
    "classStructure" text,
    "studentsWho" text,
    requirements text,
    "studentLim" text,
    price text,
    currency text,
    "accN" text,
    "bankN" text,
    "holderN" text,
    "accTpe" text,
    ifsc text,
    img jsonb,
    free boolean DEFAULT false NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    users jsonb
);


ALTER TABLE public."Class_V" OWNER TO bask;

--
-- Name: Class_V_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Class_V_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Class_V_id_seq" OWNER TO bask;

--
-- Name: Class_V_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Class_V_id_seq" OWNED BY public."Class_V".id;


--
-- Name: Classes; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Classes" (
    id integer NOT NULL,
    title text,
    date text NOT NULL,
    duration text NOT NULL,
    "time" text NOT NULL,
    description text,
    course_id integer,
    fee text,
    over boolean DEFAULT false NOT NULL,
    classroom_course_id integer
);


ALTER TABLE public."Classes" OWNER TO bask;

--
-- Name: Classes_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Classes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classes_id_seq" OWNER TO bask;

--
-- Name: Classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Classes_id_seq" OWNED BY public."Classes".id;


--
-- Name: Classroom; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Classroom" (
    id integer NOT NULL,
    email_type text NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    title text NOT NULL,
    description text,
    logo text,
    host integer
);


ALTER TABLE public."Classroom" OWNER TO bask;

--
-- Name: ClassroomUser_V2; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."ClassroomUser_V2" (
    id integer NOT NULL,
    "ClassroomId" integer,
    email_id text NOT NULL,
    password text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    img_thumbnail text,
    phone_number text
);


ALTER TABLE public."ClassroomUser_V2" OWNER TO bask;

--
-- Name: ClassroomUser_V2_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."ClassroomUser_V2_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ClassroomUser_V2_id_seq" OWNER TO bask;

--
-- Name: ClassroomUser_V2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."ClassroomUser_V2_id_seq" OWNED BY public."ClassroomUser_V2".id;


--
-- Name: Classroom_Course; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Classroom_Course" (
    id integer NOT NULL,
    completion boolean DEFAULT false NOT NULL,
    title text NOT NULL,
    description text,
    host integer NOT NULL,
    images text[],
    hosted boolean DEFAULT false NOT NULL,
    link text,
    requirements jsonb,
    creator integer,
    dolphin jsonb
);


ALTER TABLE public."Classroom_Course" OWNER TO bask;

--
-- Name: Classroom_Course_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Classroom_Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classroom_Course_id_seq" OWNER TO bask;

--
-- Name: Classroom_Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Classroom_Course_id_seq" OWNED BY public."Classroom_Course".id;


--
-- Name: Classroom_Session_V2; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Classroom_Session_V2" (
    id integer NOT NULL,
    "ClassroomId" integer NOT NULL,
    "languageOfClass" text,
    date jsonb,
    title text,
    description text,
    "trainerBio" text,
    "sessionStructure" text,
    "studentsWho" text,
    requirements text,
    "trainerMailId" text,
    img jsonb
);


ALTER TABLE public."Classroom_Session_V2" OWNER TO bask;

--
-- Name: Classroom_Session_V2_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Classroom_Session_V2_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classroom_Session_V2_id_seq" OWNER TO bask;

--
-- Name: Classroom_Session_V2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Classroom_Session_V2_id_seq" OWNED BY public."Classroom_Session_V2".id;


--
-- Name: Classroom_V2; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Classroom_V2" (
    id integer NOT NULL,
    title text NOT NULL,
    industry text NOT NULL,
    bio text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    logo text NOT NULL,
    "adminId" integer NOT NULL,
    email_type text NOT NULL,
    planid integer NOT NULL,
    "iDU" boolean NOT NULL,
    "adminPass" text DEFAULT 'pass'::text NOT NULL,
    joinees jsonb
);


ALTER TABLE public."Classroom_V2" OWNER TO bask;

--
-- Name: Classroom_V2_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Classroom_V2_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classroom_V2_id_seq" OWNER TO bask;

--
-- Name: Classroom_V2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Classroom_V2_id_seq" OWNED BY public."Classroom_V2".id;


--
-- Name: Classroom_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Classroom_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Classroom_id_seq" OWNER TO bask;

--
-- Name: Classroom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Classroom_id_seq" OWNED BY public."Classroom".id;


--
-- Name: CommentReaction; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."CommentReaction" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    react_to integer NOT NULL
);


ALTER TABLE public."CommentReaction" OWNER TO bask;

--
-- Name: CommentReaction_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."CommentReaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CommentReaction_id_seq" OWNER TO bask;

--
-- Name: CommentReaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."CommentReaction_id_seq" OWNED BY public."CommentReaction".id;


--
-- Name: Comments; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Comments" (
    id integer NOT NULL,
    post_id integer DEFAULT 0,
    user_id integer DEFAULT 0 NOT NULL,
    comment_body text DEFAULT ''::text NOT NULL,
    reply boolean DEFAULT false NOT NULL,
    reply_to integer DEFAULT 0 NOT NULL,
    edited boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Comments" OWNER TO bask;

--
-- Name: Comments_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Comments_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comments_id_seq" OWNER TO bask;

--
-- Name: Comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Comments_id_seq" OWNED BY public."Comments".id;


--
-- Name: Completed_Class; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Completed_Class" (
    id integer NOT NULL,
    "languageOfClass" text,
    trainer_id integer NOT NULL,
    date jsonb,
    title text,
    description text,
    "trainerBio" text,
    "classStructure" text,
    "studentsWho" text,
    requirements text,
    "studentLim" text,
    price text,
    currency text,
    "accN" text,
    "bankN" text,
    "holderN" text,
    "accTpe" text,
    ifsc text,
    upi text,
    img jsonb,
    free boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Completed_Class" OWNER TO bask;

--
-- Name: Completed_Class_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Completed_Class_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Completed_Class_id_seq" OWNER TO bask;

--
-- Name: Completed_Class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Completed_Class_id_seq" OWNED BY public."Completed_Class".id;


--
-- Name: Completed_Course; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Completed_Course" (
    id integer NOT NULL,
    "languageOfClass" text,
    verified boolean DEFAULT false NOT NULL,
    trainer_id integer NOT NULL,
    date jsonb,
    title text,
    description text,
    "trainerBio" text,
    "classStructure" jsonb,
    afterclassyouwillbe text,
    "studentsWho" text,
    requirements text,
    "studentLim" text,
    price text,
    currency text,
    "accN" text,
    "bankN" text,
    "holderN" text,
    "accTpe" text,
    ifsc text,
    upi text,
    img jsonb,
    free boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Completed_Course" OWNER TO bask;

--
-- Name: Completed_Course_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Completed_Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Completed_Course_id_seq" OWNER TO bask;

--
-- Name: Completed_Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Completed_Course_id_seq" OWNED BY public."Completed_Course".id;


--
-- Name: Connections; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Connections" (
    id integer NOT NULL,
    "ownerId" integer NOT NULL,
    followers integer[],
    following integer[]
);


ALTER TABLE public."Connections" OWNER TO bask;

--
-- Name: Connections_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Connections_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Connections_id_seq" OWNER TO bask;

--
-- Name: Connections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Connections_id_seq" OWNED BY public."Connections".id;


--
-- Name: Course; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Course" (
    id integer NOT NULL,
    description text NOT NULL,
    host integer NOT NULL,
    max_paticipants integer NOT NULL,
    hosted boolean DEFAULT false NOT NULL,
    content jsonb,
    duration_type text,
    methodology jsonb,
    requirements jsonb,
    structure jsonb,
    class_structure text,
    link text,
    price text,
    title text NOT NULL,
    images text[],
    completion boolean DEFAULT false NOT NULL,
    readmore boolean DEFAULT false NOT NULL,
    dolphin jsonb
);


ALTER TABLE public."Course" OWNER TO bask;

--
-- Name: Course_V; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Course_V" (
    id integer NOT NULL,
    "languageOfClass" text,
    verified boolean DEFAULT false NOT NULL,
    trainer_id integer NOT NULL,
    date jsonb,
    title text,
    description text,
    "trainerBio" text,
    "classStructure" jsonb,
    afterclassyouwillbe text,
    "studentsWho" text,
    requirements text,
    "studentLim" text,
    price text,
    currency text,
    "accN" text,
    "bankN" text,
    "holderN" text,
    "accTpe" text,
    ifsc text,
    img jsonb,
    free boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Course_V" OWNER TO bask;

--
-- Name: Course_V_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Course_V_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_V_id_seq" OWNER TO bask;

--
-- Name: Course_V_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Course_V_id_seq" OWNED BY public."Course_V".id;


--
-- Name: Course_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Course_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Course_id_seq" OWNER TO bask;

--
-- Name: Course_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Course_id_seq" OWNED BY public."Course".id;


--
-- Name: Follower; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Follower" (
    id integer NOT NULL,
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL
);


ALTER TABLE public."Follower" OWNER TO bask;

--
-- Name: Follower_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Follower_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Follower_id_seq" OWNER TO bask;

--
-- Name: Follower_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Follower_id_seq" OWNED BY public."Follower".id;


--
-- Name: Friends; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Friends" (
    id integer NOT NULL,
    friend_id integer NOT NULL,
    my_id integer NOT NULL,
    accepted boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Friends" OWNER TO bask;

--
-- Name: Friends_Peer; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Friends_Peer" (
    id integer NOT NULL,
    my_id integer NOT NULL,
    peer_id integer NOT NULL
);


ALTER TABLE public."Friends_Peer" OWNER TO bask;

--
-- Name: Friends_Peer_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Friends_Peer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Friends_Peer_id_seq" OWNER TO bask;

--
-- Name: Friends_Peer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Friends_Peer_id_seq" OWNED BY public."Friends_Peer".id;


--
-- Name: Friends_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Friends_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Friends_id_seq" OWNER TO bask;

--
-- Name: Friends_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Friends_id_seq" OWNED BY public."Friends".id;


--
-- Name: Gift; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Gift" (
    id integer NOT NULL,
    email_id text NOT NULL,
    course_id integer NOT NULL,
    gifted_by integer NOT NULL,
    participant_id integer NOT NULL
);


ALTER TABLE public."Gift" OWNER TO bask;

--
-- Name: Gift_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Gift_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Gift_id_seq" OWNER TO bask;

--
-- Name: Gift_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Gift_id_seq" OWNED BY public."Gift".id;


--
-- Name: KeepAlive; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."KeepAlive" (
    "userId" integer NOT NULL,
    "isAlive" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."KeepAlive" OWNER TO bask;

--
-- Name: KeepAlive_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."KeepAlive_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."KeepAlive_id_seq" OWNER TO bask;

--
-- Name: KeepAlive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."KeepAlive_id_seq" OWNED BY public."KeepAlive".id;


--
-- Name: Liked_Post; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Liked_Post" (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Liked_Post" OWNER TO bask;

--
-- Name: Liked_Post_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Liked_Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Liked_Post_id_seq" OWNER TO bask;

--
-- Name: Liked_Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Liked_Post_id_seq" OWNED BY public."Liked_Post".id;


--
-- Name: Live_Streaming; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Live_Streaming" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title text NOT NULL,
    thumbnail text NOT NULL,
    finished boolean DEFAULT false NOT NULL,
    live boolean DEFAULT false NOT NULL,
    "streamStartedAt" timestamp(3) without time zone,
    "streamEndedAt" timestamp(3) without time zone,
    "highestViewCount" integer,
    "liveViewCount" integer,
    tags text[]
);


ALTER TABLE public."Live_Streaming" OWNER TO bask;

--
-- Name: Live_Streaming_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Live_Streaming_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Live_Streaming_id_seq" OWNER TO bask;

--
-- Name: Live_Streaming_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Live_Streaming_id_seq" OWNED BY public."Live_Streaming".id;


--
-- Name: Message; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "chatRoomId" text NOT NULL,
    content text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Message" OWNER TO bask;

--
-- Name: MessageRequest; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."MessageRequest" (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "receiverId" integer NOT NULL,
    message text NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    viewed boolean DEFAULT false NOT NULL
);


ALTER TABLE public."MessageRequest" OWNER TO bask;

--
-- Name: MessageRequest_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."MessageRequest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MessageRequest_id_seq" OWNER TO bask;

--
-- Name: MessageRequest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."MessageRequest_id_seq" OWNED BY public."MessageRequest".id;


--
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Message_id_seq" OWNER TO bask;

--
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text NOT NULL,
    img text,
    "sentAt" timestamp(3) without time zone,
    status public."NotificationStatus" DEFAULT 'WAITING'::public."NotificationStatus" NOT NULL,
    title text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Notification" OWNER TO bask;

--
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO bask;

--
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- Name: Participants; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Participants" (
    id integer NOT NULL,
    course_id integer NOT NULL,
    participant_id integer NOT NULL
);


ALTER TABLE public."Participants" OWNER TO bask;

--
-- Name: Participants_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Participants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Participants_id_seq" OWNER TO bask;

--
-- Name: Participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Participants_id_seq" OWNED BY public."Participants".id;


--
-- Name: Public_Post; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Public_Post" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    caption text,
    images text[] DEFAULT ARRAY[]::text[],
    private boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    videos text[] DEFAULT ARRAY[]::text[]
);


ALTER TABLE public."Public_Post" OWNER TO bask;

--
-- Name: Public_Post_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Public_Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Public_Post_id_seq" OWNER TO bask;

--
-- Name: Public_Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Public_Post_id_seq" OWNED BY public."Public_Post".id;


--
-- Name: Reactions; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Reactions" (
    id integer NOT NULL,
    course_id integer,
    reactor_id integer NOT NULL,
    heartful integer DEFAULT 1 NOT NULL,
    classroom_course_id integer
);


ALTER TABLE public."Reactions" OWNER TO bask;

--
-- Name: Reactions_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Reactions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reactions_id_seq" OWNER TO bask;

--
-- Name: Reactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Reactions_id_seq" OWNED BY public."Reactions".id;


--
-- Name: Suggest; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Suggest" (
    id integer NOT NULL,
    email_id text NOT NULL,
    course_id integer NOT NULL,
    suggested_by integer NOT NULL,
    participant_id integer
);


ALTER TABLE public."Suggest" OWNER TO bask;

--
-- Name: Suggest_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Suggest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Suggest_id_seq" OWNER TO bask;

--
-- Name: Suggest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Suggest_id_seq" OWNED BY public."Suggest".id;


--
-- Name: User_Info; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."User_Info" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    "whatBrings" text,
    "currentIndustry" text,
    "heardBy" text,
    dob text,
    languages text[],
    education text,
    "currentCompany" text,
    awards jsonb,
    flink text,
    xlink text,
    tubelink text,
    linkedin text,
    "interestedTags" text[],
    location text DEFAULT ''::text NOT NULL,
    skilss text[] DEFAULT ARRAY[]::text[],
    headline text
);


ALTER TABLE public."User_Info" OWNER TO bask;

--
-- Name: User_Info_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."User_Info_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_Info_id_seq" OWNER TO bask;

--
-- Name: User_Info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."User_Info_id_seq" OWNED BY public."User_Info".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    provider text DEFAULT 'email/phone'::text NOT NULL,
    img_thumbnail text,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone_num text,
    password text NOT NULL,
    about text,
    admin boolean DEFAULT false NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    otp integer DEFAULT 0 NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    classroom_id integer,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    backbanner text DEFAULT ''::text
);


ALTER TABLE public."Users" OWNER TO bask;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO bask;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: Vid_Classes; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Vid_Classes" (
    id integer NOT NULL,
    name text NOT NULL,
    course_id integer,
    classroom_course_id integer
);


ALTER TABLE public."Vid_Classes" OWNER TO bask;

--
-- Name: Vid_Classes_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Vid_Classes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Vid_Classes_id_seq" OWNER TO bask;

--
-- Name: Vid_Classes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Vid_Classes_id_seq" OWNED BY public."Vid_Classes".id;


--
-- Name: Wishlist; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."Wishlist" (
    id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public."Wishlist" OWNER TO bask;

--
-- Name: Wishlist_id_seq; Type: SEQUENCE; Schema: public; Owner: bask
--

CREATE SEQUENCE public."Wishlist_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Wishlist_id_seq" OWNER TO bask;

--
-- Name: Wishlist_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bask
--

ALTER SEQUENCE public."Wishlist_id_seq" OWNED BY public."Wishlist".id;


--
-- Name: _Book_mark_PostToPublic_Post; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_Book_mark_PostToPublic_Post" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_Book_mark_PostToPublic_Post" OWNER TO bask;

--
-- Name: _CartToCourse_V; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_CartToCourse_V" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CartToCourse_V" OWNER TO bask;

--
-- Name: _ClassCart; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_ClassCart" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ClassCart" OWNER TO bask;

--
-- Name: _ClassWishlist; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_ClassWishlist" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ClassWishlist" OWNER TO bask;

--
-- Name: _Course_VToWishlist; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_Course_VToWishlist" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_Course_VToWishlist" OWNER TO bask;

--
-- Name: _Liked_PostToPublic_Post; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_Liked_PostToPublic_Post" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_Liked_PostToPublic_Post" OWNER TO bask;

--
-- Name: _UsersRelation; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public."_UsersRelation" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_UsersRelation" OWNER TO bask;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: bask
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO bask;

--
-- Name: Admin id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Admin" ALTER COLUMN id SET DEFAULT nextval('public."Admin_id_seq"'::regclass);


--
-- Name: Book_mark_Post id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Book_mark_Post" ALTER COLUMN id SET DEFAULT nextval('public."Book_mark_Post_id_seq"'::regclass);


--
-- Name: Cart id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Cart" ALTER COLUMN id SET DEFAULT nextval('public."Cart_id_seq"'::regclass);


--
-- Name: Class_V id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Class_V" ALTER COLUMN id SET DEFAULT nextval('public."Class_V_id_seq"'::regclass);


--
-- Name: Classes id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classes" ALTER COLUMN id SET DEFAULT nextval('public."Classes_id_seq"'::regclass);


--
-- Name: Classroom id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom" ALTER COLUMN id SET DEFAULT nextval('public."Classroom_id_seq"'::regclass);


--
-- Name: ClassroomUser_V2 id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."ClassroomUser_V2" ALTER COLUMN id SET DEFAULT nextval('public."ClassroomUser_V2_id_seq"'::regclass);


--
-- Name: Classroom_Course id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Course" ALTER COLUMN id SET DEFAULT nextval('public."Classroom_Course_id_seq"'::regclass);


--
-- Name: Classroom_Session_V2 id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Session_V2" ALTER COLUMN id SET DEFAULT nextval('public."Classroom_Session_V2_id_seq"'::regclass);


--
-- Name: Classroom_V2 id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_V2" ALTER COLUMN id SET DEFAULT nextval('public."Classroom_V2_id_seq"'::regclass);


--
-- Name: CommentReaction id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."CommentReaction" ALTER COLUMN id SET DEFAULT nextval('public."CommentReaction_id_seq"'::regclass);


--
-- Name: Comments id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Comments" ALTER COLUMN id SET DEFAULT nextval('public."Comments_id_seq"'::regclass);


--
-- Name: Completed_Class id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Class" ALTER COLUMN id SET DEFAULT nextval('public."Completed_Class_id_seq"'::regclass);


--
-- Name: Completed_Course id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Course" ALTER COLUMN id SET DEFAULT nextval('public."Completed_Course_id_seq"'::regclass);


--
-- Name: Connections id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Connections" ALTER COLUMN id SET DEFAULT nextval('public."Connections_id_seq"'::regclass);


--
-- Name: Course id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course" ALTER COLUMN id SET DEFAULT nextval('public."Course_id_seq"'::regclass);


--
-- Name: Course_V id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course_V" ALTER COLUMN id SET DEFAULT nextval('public."Course_V_id_seq"'::regclass);


--
-- Name: Follower id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Follower" ALTER COLUMN id SET DEFAULT nextval('public."Follower_id_seq"'::regclass);


--
-- Name: Friends id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends" ALTER COLUMN id SET DEFAULT nextval('public."Friends_id_seq"'::regclass);


--
-- Name: Friends_Peer id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends_Peer" ALTER COLUMN id SET DEFAULT nextval('public."Friends_Peer_id_seq"'::regclass);


--
-- Name: Gift id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Gift" ALTER COLUMN id SET DEFAULT nextval('public."Gift_id_seq"'::regclass);


--
-- Name: KeepAlive id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."KeepAlive" ALTER COLUMN id SET DEFAULT nextval('public."KeepAlive_id_seq"'::regclass);


--
-- Name: Liked_Post id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Liked_Post" ALTER COLUMN id SET DEFAULT nextval('public."Liked_Post_id_seq"'::regclass);


--
-- Name: Live_Streaming id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Live_Streaming" ALTER COLUMN id SET DEFAULT nextval('public."Live_Streaming_id_seq"'::regclass);


--
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


--
-- Name: MessageRequest id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."MessageRequest" ALTER COLUMN id SET DEFAULT nextval('public."MessageRequest_id_seq"'::regclass);


--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- Name: Participants id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Participants" ALTER COLUMN id SET DEFAULT nextval('public."Participants_id_seq"'::regclass);


--
-- Name: Public_Post id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Public_Post" ALTER COLUMN id SET DEFAULT nextval('public."Public_Post_id_seq"'::regclass);


--
-- Name: Reactions id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Reactions" ALTER COLUMN id SET DEFAULT nextval('public."Reactions_id_seq"'::regclass);


--
-- Name: Suggest id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Suggest" ALTER COLUMN id SET DEFAULT nextval('public."Suggest_id_seq"'::regclass);


--
-- Name: User_Info id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."User_Info" ALTER COLUMN id SET DEFAULT nextval('public."User_Info_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Name: Vid_Classes id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Vid_Classes" ALTER COLUMN id SET DEFAULT nextval('public."Vid_Classes_id_seq"'::regclass);


--
-- Name: Wishlist id; Type: DEFAULT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Wishlist" ALTER COLUMN id SET DEFAULT nextval('public."Wishlist_id_seq"'::regclass);


--
-- Data for Name: Admin; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Admin" (id, first_name, last_name, email, phone_num, password, joined_at, last_active_at, last_deactive_at, superadmin) FROM stdin;
\.


--
-- Data for Name: Book_mark_Post; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Book_mark_Post" (id, user_id) FROM stdin;
1	4
2	26
3	27
4	25
5	24
6	20
7	48
8	7
9	58
\.


--
-- Data for Name: Cart; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Cart" (id, user_id) FROM stdin;
1	8
2	5
3	6
4	20
5	26
6	24
7	25
8	18
9	35
10	34
11	48
12	50
13	59
14	2
15	69
\.


--
-- Data for Name: Chat_rooms; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Chat_rooms" (_id, type, participants, group_name, group_image, "adminId", last_message, last_message_time, created_at, on_call) FROM stdin;
\.


--
-- Data for Name: Class_V; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Class_V" (id, "languageOfClass", trainer_id, date, title, description, "trainerBio", "classStructure", "studentsWho", requirements, "studentLim", price, currency, "accN", "bankN", "holderN", "accTpe", ifsc, img, free, verified, users) FROM stdin;
3	English	8	[{"date": "2024-08-26", "time": "13:00", "duration": "120"}]	Art of Natyam	<p>Immerse yourself in the rich tradition of this classical Indian dance form, known for its grace, expression, and rhythm. Whether you're a beginner or have some experience, this course will guide you through the fundamental techniques, including basic postures, hand gestures (mudras), and rhythmic patterns (tala). You'll also explore the cultural significance and storytelling aspects that make Bharatanatyam unique.</p>	<p><span style="color: rgb(33, 37, 41);">Meet Geetha, a dedicated Bharatanatyam dancer with a passion for bringing the grace and tradition of this classical dance form to life. With years of rigorous training and performance experience, Geetha specializes in teaching the techniques and expressive art of Bharatanatyam.</span></p>	<ul><li>Welcome and brief overview of the class.</li><li>Introduction to Bharatanatyam: its history, significance, and basic elements.</li><li>Gentle stretching and physical warm-up to prepare the body for dancing.</li><li>Basic exercises to improve flexibility, strength, and posture.</li><li>Introduction to fundamental Bharatanatyam postures (e.g.,&nbsp;<strong>Aramandi</strong>,&nbsp;<strong>Nattadavu</strong>).</li><li>Explanation of foot positions, hand gestures (<strong>Mudras</strong>), and body alignment.</li><li>Practice of fundamental steps and movements, including&nbsp;<strong>Adavus</strong>&nbsp;(basic dance steps).</li><li>Focus on technique, rhythm, and coordination.</li><li>Introduction to basic hand gestures (<strong>Mudras</strong>) and facial expressions (<strong>Abhinaya</strong>).</li></ul>	Our class is designed to be both educational and inspiring, offering a supportive environment where you can explore the beauty of Bharatanatyam at your own pace. No prior dance experience is necessary—just a passion for learning and a willingness to immerse yourself in this beautiful art form.	- A comfortable outfit preferably Kurta, Leggings, Dupatta, Book and Pen (for notes)	500	2000	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/classyNritya.jpeg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Shiva+Shambho_+Most+Watched+Bharatanatyam+Dance+_+Best+of+Indian+Classical+Dance+(online-video-cutter.com).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
1	English	4	[{"date": "2024-08-23", "time": "14:30", "duration": "120"}]	Paint with Handcraft_it	<p><span style="background-color: rgb(248, 243, 227); color: rgb(0, 0, 0);">In her painting class, you will begin an artistic journey to explore various painting techniques across different bases and media. Her classes are designed to broaden your creative horizons and enhance your artistic skills through hands-on experience with a mixed range of materials.</span></p>	<p><span style="color: rgb(33, 37, 41);">Meet Radhika! An Influencer who is passionate about painting, baking, and blogging, she’s always looking for ways to infuse creativity into her daily life. Balancing these passions with a 9-to-5 schedule Has been challenging but, Radhika is always looking to carve out time for what she truly loves.&nbsp;</span></p>	<ul><li>Welcome, and overview of the class.</li><li>A brief introduction to the basic principles of painting and what students will learn.</li><li>Introduction to essential painting materials (paints, brushes, canvases, palettes, etc.).</li><li>Demonstration of proper setup and preparation for painting.</li><li>Overview of fundamental painting techniques (e.g., brush strokes, blending, layering).</li><li>Hands-on practice with each technique using available materials.</li><li>Introduction to basic color theory (primary, secondary, and tertiary colors).</li><li>Understanding color mixing, gradients, and creating color palettes.</li></ul>	In this class, you will explore essential painting techniques and materials, including different types of paints, brushes, and surfaces. You'll learn foundational skills such as brush strokes, color mixing, and blending while understanding design principles like composition, light, and shadow. The course covers color theory, layering techniques, and various painting methods to create simple works, from still life and landscapes to abstract art. Additionally, you'll have the opportunity to develop your style through experimentation, care for your supplies, and practice self-assessment and constructive critique. By the end, you'll be equipped with the skills and confidence to create and evaluate your artwork.	Paints, Brushes, Surfaces, Mixing Palette, Sketching Materials, 	200	1500	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/Neutral+Brown+Creative+Paint+Strokes+Art+Classes+Facebook+Cover.png", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.c\\nloudfront.net/Black & White Landscape Painting for Beginners _ Cherry Blossom _ Acrylic Painting Technique (online-video-cutter.com).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
15	English	33	[{"date": "2024-09-24", "time": "17:00", "duration": "60"}]	Classical Cadence	In this class, Sreelakshmi is committed to guiding students through the intricate nuances of classical music, helping them develop their vocal techniques, understand the rich heritage of the art form, and express themselves through music.	<p>Meet Sreelakshmi, a skilled classical singer and dedicated music tutor with a deep passion for traditional music. With years of rigorous training and performance experience, Sreelakshmi excels in both vocal mastery and the art of teaching.</p>	<ul><li>Begin with breathing exercises and vocal warm-ups to prepare the voice.</li><li>Explore a specific raga or scale, focusing on its structure and keynotes.</li><li>Work on a chosen composition or song, applying the raga and focusing on techniques like pitch, rhythm, and expression.</li><li>End with gentle vocal cool-down exercises and a brief discussion on progress and areas to focus on for the next session.</li></ul>	This 1-hour beginner classical music class introduces you to the basics of classical singing. You'll start with simple vocal warm-ups and breathing exercises. Then, you'll learn about basic ragas and scales, practising how to sing keynotes. The class includes working on a simple song, focusing on pitch, rhythm, and expression. We'll finish with a cool-down and a quick review of your learning.	pen and note	100	1000	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/classiccandance.jpeg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Untitled%20design%20(4).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
14	English	32	[{"date": "2024-09-25", "time": "15:00", "duration": "180"}]	Groove Her Way	In this class she will be using her dynamic teaching style that is all about making dance accessible, fun, and empowering for her students, helping them find their groove and confidence on the dance floor. Whether you're just starting or looking to refine your skills, Arya is ready to guide you on your dance journey.	<p>Meet Arya, a passionate Western dancer with a deep love for movement and rhythm. With years of experience mastering various dance styles, as a tutor she is eager to share her energy and expertise with others. Arya’s energetic and supportive teaching approach makes this class accessible and enjoyable for all levels, ensuring that everyone can find their rhythm and have fun.</p>	<p>● Begin with light cardio and dynamic stretches to prepare the body.</p><p>● Focus on fundamental moves and key dance techniques, breaking them down step by step.</p><p>● Learn and practise a fun, energetic dance routine, integrating the techniques covered earlier.</p><p>● Encourage students to explore their creativity through freestyle dancing.</p><p>● Finish with gentle stretches and a discussion on progress and key takeaways from the session.</p>	Our class is perfect for anyone who loves to dance, whether you're a complete beginner or have some experience. It's ideal for those looking to learn or refine their skills in Western dance styles, explore new moves, and build confidence on the dance floor. Arya’s energetic and supportive teaching approach makes this class accessible and enjoyable for all levels, ensuring that everyone can find their rhythm and have fun.	Comfortable Dress and shoes	100	2000	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/added!.png", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/15%20MIN%20HYPE%20DANCE%20WORKOUT%20-%20Follow%20Along_No%20Equipment%20(online-video-cutter.com).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
7	English	13	[{"date": "2024-08-26", "time": "16:00", "duration": "120"}]	The Analytics Advantage	<p>This course is designed to equip you with the skills to analyse data and make informed business decisions. You'll learn key concepts such as data collection, cleaning, and visualisation, along with advanced techniques like predictive modelling and optimization. Whether you're new to analytics or looking to enhance your expertise, this course will provide you with the practical tools and insights needed to turn data into actionable strategies.</p>	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">As a seasoned consultant, Anderson specializes in analyzing data and developing strategic solutions for business management through the application of cutting-edge technology. His deep understanding of AI and its impact on modern business makes him an invaluable resource.</span></p>	<ul><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Introduction and Overview&nbsp; of Business Analytics</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Data Collection Techniques and Preparations</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Exploratory Data Analysis (EDA) and Data Visualization&nbsp;</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Predictive Analytics and Introduction to Predictive Modeling</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Prescriptive Analytics and Optimization Techniques</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Simulation Models</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Big Data Analytics and Integrating Analytics into Business Strategy</span></li><li><span style=\\"background-color: transparent; color: rgb(0, 0, 0);\\">Ethical and Legal Considerations</span></li></ul><p><br></p>	In this Business Analytics course, you will master core concepts and techniques for collecting, cleaning, and preparing high-quality data. You'll develop skills in exploring and visualizing data to uncover trends and insights, create and evaluate predictive models using statistical methods and machine learning, and apply optimization and simulation techniques for decision-making. The course also covers Big Data analytics, aligning analytics with business strategies, and understanding ethical and legal considerations. Through a capstone project, you'll apply your knowledge to solve a real-world business problem, equipping you with the skills to make impactful, data-driven decisions.\n	Laptop/desktop with good internet connection and camera.	200	900	rupee	213234232324	hdfc	priyanshu	savings	barbokaidel	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/Business+Analytics.jpg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.c\\nloudfront.net/Untitled design.mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
11	English	29	[{"date": "2024-09-25", "time": "14:00", "duration": "180"}]	Classy Nritya	<p> In this class, Sneha expertly guides students through the nuances of this traditional art form, offering personalized online classes that inspire and cultivate a deep love for dance through the extensive training and knowledge she has acquired. </p>	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">Meet Sneha, a professional Bharatanatyam dancer with more than 5 years of experience as a trainer pursuing post-graduation in Bharatanatyam who is passionate about learning as well as teaching those passionate to learn the traditional art of Bharatanatyam.</span></p>	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">This 3-hour online Bharatanatyam class is designed to cover all key aspects of the dance. We start with a 15-minute warm-up to get everyone ready, followed by 45 minutes of focused practice on basic steps (Adavus) with personalised feedback. After a 10-minute break, we spend 30 minutes learning expressions and hand gestures (Abhinaya). Then, we dedicate 45 minutes to learning or continuing a dance piece, combining the steps and expressions with music. We finish with a 15-minute cool-down and a Q&amp;A session to review what we’ve learned and discuss any questions.</span></p>	These classes are for anyone interested in learning Indian classical dance, whether you're a beginner or have some experience. They're great for those wanting to start dancing, improve their skills, or explore the art form's expressive aspects. The classes cater to all levels and offer personalised guidance to help you nurture your passion for being a dancer.	Comfortable outfits, pen and note for taking notes 	100	2000	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/WhatsApp+Image+2024-09-18+at+6.09.32+PM.jpeg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Untitled%20design%20(5).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
5	English	11	[{"date": "2024-08-26", "time": "15:30", "duration": "120"}]	Science & Technology 	<p>This class explores the fundamental principles and advancements in science and technology, fostering an understanding of the natural world and the innovations shaping our future. Students will engage in hands-on experiments, critical thinking, and discussions on how technology impacts society, preparing them for careers in a rapidly evolving world.</p>	<p><span style="color: rgb(51, 51, 51); background-color: transparent;">A dedicated and experienced educator with a passion for empowering students to achieve academic success and personal growth. Skilled in creating personalized learning plans tailored to meet the unique needs of each student.</span></p>	<ul><li><strong>Introduction to Key Concepts: </strong>Overview of scientific principles and technological advancements, including basic physics, chemistry, and biology.</li><li><strong>Hands-on Experiments:</strong> Interactive lab sessions to explore real-world applications of scientific theories, focusing on problem-solving and innovation.</li><li><strong>Impact of Technology:</strong> Discussions on how technology influences society, ethics in technology, and future trends in science and technology.</li></ul>	This class is ideal for curious individuals who are passionate about understanding the principles of science and the role of technology in shaping our world. It's designed for students who enjoy hands-on learning, critical thinking, and exploring the ethical and societal impacts of technological advancements. Whether you're considering a career in science, engineering, or technology, or simply want to broaden your knowledge, this class will provide you with the skills and insights needed to navigate and contribute to a rapidly evolving world.	Laptop/desktop with good internet connection and camera.	100	2500	rupee	232312312312	HDFC	NJndjnd	asdnasjndajs	ajsdnajnsdjas	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/Science.png", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.c\\nloudfront.net/Science Animated 2D with 3D Showreel (online-video-cutter.com).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
2	English	7	[{"date": "2024-08-30", "time": "16:30", "duration": "120"}]	Bake to Perfection	<p>In this class, you'll explore the fundamentals of baking, including ingredient selection, mixing techniques, and baking science. Whether you're a beginner looking to bake your first batch of cookies or an experienced baker aiming to refine your skills, this course offers a hands-on, interactive approach to learning.</p>	<p>Meet Neethi, a dedicated baker with a passion for creating delicious and delightful desserts. From pastries to rich, decadent cakes, baking is her art, and the kitchen is her studio. The magic that happens when simple ingredients come together to create something extraordinary Inspires her to do more.</p><p><br></p>	<ul><li>Welcome, and overview of the day's baking lesson.</li><li>A brief introduction to the basic principles of baking and what students will learn.</li><li>Introduction to essential baking ingredients (flour, sugar, butter, etc.) and their functions.</li><li>Overview of key baking tools (mixers, measuring cups, baking pans, etc.).</li><li>Demonstration of proper measuring techniques (dry and liquid ingredients).</li><li>Tips on preparing ingredients and equipment before starting to bake.</li><li>Instruction on fundamental baking techniques such as creaming butter and sugar, folding, and mixing.</li><li>Practice simple techniques with hands-on guidance.</li><li>Step-by-step demonstration of a basic recipe (e.g., cookies, muffins, or a simple cake).</li><li>Explanation of each step and how it affects the final product.</li><li>Students follow the demonstrated recipe to make their batch.</li><li>The instructor provides individual assistance and feedback as needed.</li></ul>	Our class is designed to be both educational and fun, providing a supportive environment where you can learn and experiment with baking techniques. No prior baking experience is necessary—just a passion for creating and enjoying delicious treats!	Baking Equipment , Baking Pans and Trays, Oven Tools, Baking Utensils, Kitchen Appliances , Baking Ingredients 	200	1500	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/Baking+class1.jpg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Untitled%20design%20(3).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
12	English	30	[{"date": "2024-09-25", "time": "16:00", "duration": "120"}]	Natya Sruthi	<p>With this class her mission is to guide students with enthusiasm and expertise, helping them develop both their technical skills and artistic expression, whether they are just beginning or refining their practice.</p>	<p>Meet Shruthi, a passionate professionally trained classical dancer with great interest in training passionate minds and extending her knowledge and support to those genuinely interested.</p>	<p>Start with gentle stretches and basic postures to prepare the body. Focus on key Techniques & Adavu Practice with personalised feedback and corrections. Take a short rest to hydrate and stretch. Practice hand gestures and facial expressions to enhance storytelling. Learn or revisit a dance piece, integrating steps with music, followed by a cool-down and reflection.</p>	Our classes are perfect for anyone interested in Bharatanatyam, whether you're a beginner or have some experience. They are for those wanting to learn the basics, improve their skills, or explore the art form’s expressive elements.	Comfortable clothing, notes	100	1500	rupee	\N	\N	\N	\N	\N	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/natyaSruthi.jpeg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Alarippu-+Tisra+Alarippu-+Bharatanatyam-+Classical+dance+(online-video-cutter.com).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
6	English	12	[{"date": "2024-08-28", "time": "16:00", "duration": "120"}]	Transport Tech	In this course, you will embark on a journey with a comprehensive understanding of the planning, design, and management of transportation systems. You'll explore key topics such as traffic flow theory, transportation planning, highway and roadway design, and sustainable transport solutions.	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">Meet Haanya, a dedicated Civil and Transportation Engineer with a specialized focus on highway geometric design, and modeling. Haanya excels in advancing transportation infrastructure. Her expertise extends to conducting research and producing publications that push the boundaries of conventional practices.</span></p>	<ul><li><span style="background-color: transparent;">Structural Engineering</span></li><li><span style="background-color: transparent;">Geotechnical Engineering</span></li><li><span style="background-color: transparent;">Construction Management</span></li><li><span style="background-color: transparent;">Hydraulics and Hydrology</span></li><li><span style="background-color: transparent;">Materials Science</span></li><li><span style="background-color: transparent;">Environmental Engineering</span></li><li><span style="background-color: transparent;">Highway Geometric Design</span></li><li><span style="background-color: transparent;">Traffic Engineering</span></li><li><span style="background-color: transparent;">Pavement Engineering</span></li><li><span style="background-color: transparent;">Transportation Planning</span></li><li><span style="background-color: transparent;">Modeling and Simulation</span></li><li><span style="background-color: transparent;">Sustainability in Transportation</span></li></ul>	After completing this course, you will have studied each concept of transportation engineering in detail, which will significantly enhance your understanding and clarity of the subject. This in-depth exploration will provide you with comprehensive knowledge of transportation systems.\n	Traffic Engineering and Transport Planning by Dr. lr Kadiyala (Textbook), Highway Engineering by Khanna and Justo (Textbook)	100	2000	rupee	232312312312	HDFC	NJndjnd	asdnasjndajs	ajsdnajnsdjas	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/learn+Transport+Engineering.png", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Untitled%20design%20(1).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
9	English	15	[{"date": "2024-08-29", "time": "19:00", "duration": "120"}]	French Flair	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">You will acquire a solid understanding of basic French grammar and expand your vocabulary for everyday use. You’ll enhance your listening and comprehension skills, improve your speaking and pronunciation, and develop your reading and writing abilities. The course will enable you to engage in basic conversations and provide insights into French-speaking cultures, preparing you for further language study and enriching your overall experience with the French language.</span></p><p><br></p><p><br></p>	<p><span style="background-color: transparent; color: rgb(0, 0, 0);">Meet Clara, a native German and Swiss German speaker who was born and raised in Switzerland and completed her studies in Germany. With a deep passion for languages and linguistics, Clara has been teaching for 4 years and is dedicated to sharing her love for the German language with her students.</span></p>	<ul><li><span style="background-color: transparent; color: rgb(0, 0, 0);">Introduction to French</span></li><li><span style="background-color: transparent; color: rgb(0, 0, 0);">French Pronunciation</span></li><li><span style="background-color: transparent; color: rgb(0, 0, 0);">Basic Grammar and Sentence Structure</span></li><li><span style="background-color: transparent; color: rgb(0, 0, 0);">Everyday Conversations and Vocabulary</span></li><li><span style="background-color: transparent; color: rgb(0, 0, 0);">Reading, Writing, and Listening Practice</span></li><li><span style="background-color: transparent; color: rgb(0, 0, 0);">Cultural Insights</span></li></ul>	Beginners, Language Enthusiasts, Travelers, Students, Professionals, Cultural Explorers. This class provides a solid foundation in French, making it suitable for anyone looking to begin their language-learning journey or improve their basic French skills.	Laptop/desktop with good internet connection and camera.	200	800	rupee	21332342342233423	hdfc	priiririririririir	savings	barbokaidel	[{"url": "https://bask-s.s3.ap-south-1.amazonaws.com/Learn+French.jpg", "name": "bhr.jpg", "size": 61790}, {"url": "https://d1bxlu89wy43u2.cloudfront.net/Untitled%20design%20(2).mp4", "name": "thumbnailVid", "size": 11000}]	f	t	\N
\.


--
-- Data for Name: Classes; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Classes" (id, title, date, duration, "time", description, course_id, fee, over, classroom_course_id) FROM stdin;
1		2024-05-18	50	17:15		1		f	\N
2		2024-05-17	90	17:29		2		f	\N
\.


--
-- Data for Name: Classroom; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Classroom" (id, email_type, updated_at, title, description, logo, host) FROM stdin;
\.


--
-- Data for Name: ClassroomUser_V2; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."ClassroomUser_V2" (id, "ClassroomId", email_id, password, first_name, last_name, admin, img_thumbnail, phone_number) FROM stdin;
6	\N	org@fakeMail.co	$2b$10$ARE8kw3NaiAyXvQUmI8yXuL.8lfBrSKDjokb7EyK7QrhBU2cGrFwu	Priyanshu	Mishra	f	\N	919929384848
7	\N	sampath@blackis.in	$2b$10$i6CE59Bjj06b7R5GwaESAOGWyNwOr6oQUsxVyroU5DlFpd7qIG0QW	sampath	kumar	f	\N	919900027097
8	\N	email@org.in	$2b$10$.huf78plgF7doN9aMFzvfe9ceIaVudQPv/FDy283s6H7rQ.IILIQq	Priyanshu	Mishra	f	\N	916351833668
9	\N	org@oranization.com	$2b$10$Y8ZAF/0N8D4Kqcr7u.QlfOAQ0JUdYC7it2WDoRvIlN8drDtmqjFV2	Priyanshu	Mishra	f	\N	919992229992
10	\N	organization@bask.in	$2b$10$jrd7TF3XX6FGHUiOxvEO0OChTXMu2d80GhEslHq4W5LJA5jz3fVpq	Priyanshu	Mishra	f	\N	912816212162
11	\N	iampriyanshu1009@buisness.com	$2b$10$ZPRFC9XC64F5UoKlCOPgw..oC9VeeabK45vkUk/mRtzpv8Hwz8qD.	Priyanshu	Mishra	f	\N	919832947324
12	\N	srinidhivasishta03@bask.com	$2b$10$t.lPkZ/1iwQHRtMpe9Cv3uoalLLwGg.SNVUvrJwLkOfzGxnF2WYO.	Srinidhi	Vasishta G V	f	\N	918050076531
13	\N	iampriyanshu1009@bask.com	$2b$10$Jwm3CjP6qTmtR3Zi5dhPMuJcAX/5VYMbGgU94H3wL1f6bfvu0jEgG	Priyanshu	Mishra	f	\N	913623323345
14	\N	srinidhivasishta03@bask.com	$2b$10$YLy0fjItiQMitvc62mddG..eaozHLoNLH48qiD177iyB.oITggTuK	Srinidhi	Vasishta G V	f	\N	91805007656
15	\N	srinidhivasishta03@bask.com	$2b$10$7z8FZrnFHIqTfGAldjKaD.S0Suu4Rnwopqoz./Q.0gcvaUrDlZWg6	Srinidhi	Vasishta G V	f	\N	9180500
16	\N	srinidhivasishta03@bask.com	$2b$10$PERAdPFJWDFav0MC3L74hus49oBgbeHsyQhkNk2NwAzWaVQPE0c2S	Srinidhi	Vasishta G V	f	\N	918050076534
17	\N	srinidhivasishta03@bask.com	$2b$10$HGtvR8rvZkeJY19cN5PGgez1ansNtGv30Nb9RfEfGkP2g56pgfnVa	Srinidhi	Vasishta G V	f	\N	9180500
18	\N	srinidhivasishta03@bask.com	$2b$10$09H5ac3QIHm72/iqOVcn2.c29w2ZoYgnqLxbhdAF7Jc.VtPolAfK2	Srinidhi	Vasishta G V	f	\N	9199999
19	\N	srinidhivasishta03@bask.com	$2b$10$0QAmNDSdMx8eTU5zY6YUlez38sLnZRT5PZWNM3vbQkhalAuTCuAym	Srinidhi	Vasishta G V	f	\N	91123
20	\N	srinidhivasishta03@bask.com	$2b$10$MdnFQ/41R1A/oIwvu.VHq.S2nhuRItpmrVueteO8ei2SakFYi.Vlq	Srinidhi	Vasishta G V	f	\N	9180
21	\N	srinidhivasishta03@bask.com	$2b$10$/AeXDR09m4W39v4AeO/fM.f5j.jwFTQHP6jmGakHnKX2YgtFZSTLa	Srinidhi	Vasishta G V	f	\N	91805008
22	\N	srinidhivasishta03@bask.com	$2b$10$9sWTzHQrx7o87u9xLnxzeeHptcpIQhtTmzFc6AmZESI.kUjpj.PLu	Srinidhi	Vasishta G V	f	\N	914444
23	\N	srinidhivasishta03@bask.com	$2b$10$fdIEB.UFeGHzU8W.u3MjqeDRFNvHjkMw.tORmBhNDK5cDySIjlr3.	Srinidhi	Vasishta G V	f	\N	918050076531
24	\N	iampriyanshu1009@black.com	$2b$10$P5KejHhq9xoyz5N4E/NTSuOnbtRFnmLfl4KeOpeqpGKj5GNdPSsxK	Priyanshu	Mishra	f	\N	912382384723
25	\N	srinidhivasishta03@baskk.com	$2b$10$oH.9m2ssE0SWt2yNMnHzjedpHbWWEvkmoDTuzhCv3XaEfa29LfiPW	Srinidhi	Vasishta G V	f	\N	918199999
\.


--
-- Data for Name: Classroom_Course; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Classroom_Course" (id, completion, title, description, host, images, hosted, link, requirements, creator, dolphin) FROM stdin;
\.


--
-- Data for Name: Classroom_Session_V2; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Classroom_Session_V2" (id, "ClassroomId", "languageOfClass", date, title, description, "trainerBio", "sessionStructure", "studentsWho", requirements, "trainerMailId", img) FROM stdin;
\.


--
-- Data for Name: Classroom_V2; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Classroom_V2" (id, title, industry, bio, city, state, logo, "adminId", email_type, planid, "iDU", "adminPass", joinees) FROM stdin;
3	Fake Organization	Software	Everything	Salem	Tamil Nadu	https://res.cloudinary.com/black-box/image/upload/v1731584620/vnvahgk31qhvqzy2sbr6.webp	6	fakeMail.co	1	t	12	\N
4	Ask Creative	Advertising	We are an ad agecy	Bengaluru	Karnataka	https://res.cloudinary.com/black-box/image/upload/v1731658021/iqdcbzfxmcmg8uowkojw.jpg	7	blackis.in	1	t	Bestads@24	\N
\.


--
-- Data for Name: CommentReaction; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."CommentReaction" (id, user_id, react_to) FROM stdin;
\.


--
-- Data for Name: Comments; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Comments" (id, post_id, user_id, comment_body, reply, reply_to, edited) FROM stdin;
\.


--
-- Data for Name: Completed_Class; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Completed_Class" (id, "languageOfClass", trainer_id, date, title, description, "trainerBio", "classStructure", "studentsWho", requirements, "studentLim", price, currency, "accN", "bankN", "holderN", "accTpe", ifsc, upi, img, free) FROM stdin;
\.


--
-- Data for Name: Completed_Course; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Completed_Course" (id, "languageOfClass", verified, trainer_id, date, title, description, "trainerBio", "classStructure", afterclassyouwillbe, "studentsWho", requirements, "studentLim", price, currency, "accN", "bankN", "holderN", "accTpe", ifsc, upi, img, free) FROM stdin;
\.


--
-- Data for Name: Connections; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Connections" (id, "ownerId", followers, following) FROM stdin;
2	64	{69}	{}
3	59	{69}	{}
5	58	{69}	{}
6	26	{69}	{}
7	24	{69}	{}
8	8	{69}	{}
1	69	{}	{64,59,2,58,26,24,8,72}
9	72	{69}	{2}
4	2	{69,72}	{}
\.


--
-- Data for Name: Course; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Course" (id, description, host, max_paticipants, hosted, content, duration_type, methodology, requirements, structure, class_structure, link, price, title, images, completion, readmore, dolphin) FROM stdin;
1	http://blackboxnow.com/classes/join/41	1	20	f	[{"content": "Nothing"}]	Classes	[{}]	[{"requirements": "Nothing"}]	"Yoga"		\N	1499	Example class	{"[\\"https://res.cloudinary.com/black-box/image/upload/v1715845375/jqn6vpvuwvvnwjn7nvkg.jpg\\"]"}	f	f	\N
2	asifabfuasb	3	9	f	[{"content": "Nothing"}]	Classes	[{}]	[{"requirements": "Nothing"}]	"Nothing"		\N	1899	okkom	{"[\\"https://res.cloudinary.com/black-box/image/upload/v1715845963/ycospiy1ji2zxt6gwqcl.jpg\\"]"}	f	f	\N
\.


--
-- Data for Name: Course_V; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Course_V" (id, "languageOfClass", verified, trainer_id, date, title, description, "trainerBio", "classStructure", afterclassyouwillbe, "studentsWho", requirements, "studentLim", price, currency, "accN", "bankN", "holderN", "accTpe", ifsc, img, free) FROM stdin;
1	English	f	26	[{"date": "2024-10-23", "time": "20:14", "duration": "24"}, {"date": "2024-10-30", "time": "21:15", "duration": "89"}]	MM	<p>LLL</p>	<p>MMM</p>	["<p>MM</p>", "<p>MM</p>"]	<p>MMMMM</p>	MM	MMM	F	PO	\N	\N	\N	\N	\N	\N	[]	f
\.


--
-- Data for Name: Follower; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Follower" (id, "followerId", "followingId") FROM stdin;
\.


--
-- Data for Name: Friends; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Friends" (id, friend_id, my_id, accepted, created_at) FROM stdin;
\.


--
-- Data for Name: Friends_Peer; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Friends_Peer" (id, my_id, peer_id) FROM stdin;
\.


--
-- Data for Name: Gift; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Gift" (id, email_id, course_id, gifted_by, participant_id) FROM stdin;
\.


--
-- Data for Name: KeepAlive; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."KeepAlive" ("userId", "isAlive", "updatedAt", id) FROM stdin;
69	t	2025-03-03 07:41:43.928	1
72	t	2025-02-28 08:20:23.308	2
\.


--
-- Data for Name: Liked_Post; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Liked_Post" (id, user_id) FROM stdin;
1	26
2	27
3	20
4	18
5	24
6	25
7	48
8	7
9	58
10	2
11	72
\.


--
-- Data for Name: Live_Streaming; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Live_Streaming" (id, user_id, title, thumbnail, finished, live, "streamStartedAt", "streamEndedAt", "highestViewCount", "liveViewCount", tags) FROM stdin;
13	25	arts 	https://res.cloudinary.com/black-box/image/upload/v1727070460/ok2orfixwhhsflvfc0aa.jpg	f	f	2024-09-23 05:48:08.094	2024-09-23 05:49:03.872	\N	\N	{arts}
5	37	Flower	https://res.cloudinary.com/black-box/image/upload/v1726467989/wfsmw7fnhhvc7ax7aavu.jpg	f	f	2024-09-16 06:26:44.999	2024-09-16 06:27:04.939	1	0	{flower}
14	58	gifting 	https://res.cloudinary.com/black-box/image/upload/v1728289535/xr0vvr4zer2ulnkx2wtm.png	f	f	2024-10-07 08:25:49.474	2024-10-07 08:26:23.355	\N	\N	{gifting}
6	37	Ceramic	https://res.cloudinary.com/black-box/image/upload/v1726468096/d7nswqzjlpznop0sxiz2.jpg	f	f	2024-09-16 06:28:27.491	2024-09-16 06:31:09.272	3	3	{ceramic}
7	25	arts 	https://res.cloudinary.com/black-box/image/upload/v1726471686/fqhmctnw3ehfh8ojfxfi.png	f	f	2024-09-16 07:28:17.025	2024-09-16 07:28:55.022	2	2	{arts}
8	25	art	https://res.cloudinary.com/black-box/image/upload/v1726471767/ismog5gkp0lssjxg8pi6.png	f	f	2024-09-16 07:29:53.94	2024-09-16 07:35:16.795	1	0	{art}
16	59	Advertising	https://res.cloudinary.com/black-box/image/upload/v1728377892/aoc7cpdqxebzavdynxbv.png	f	t	2024-10-08 08:58:23.706	\N	4	3	{advertising}
9	25	handmade 	https://res.cloudinary.com/black-box/image/upload/v1726472150/c38ynj1kcddw26rufnpe.png	f	f	2024-09-16 07:36:10.926	2024-09-16 07:37:25.66	1	1	{handmade}
10	27	paint with furit colors	https://res.cloudinary.com/black-box/image/upload/v1726566781/gdd3eudb2yxlojeldrwv.jpg	f	f	2024-09-17 09:53:22.541	2024-09-17 09:54:04.556	1	1	{paint,furit,colors}
18	20	testStream	https://res.cloudinary.com/black-box/image/upload/v1732603494/dz4tk4k8cvtxuhmijuga.jpg	f	f	2024-11-26 06:45:20.338	2024-11-26 07:03:17.735	\N	\N	{teststream}
11	27	guitar beginers	https://res.cloudinary.com/black-box/image/upload/v1726567036/uu8nqwx9t62yzf9kpm41.jpg	f	f	2024-09-17 09:57:29.929	2024-09-17 09:58:00.998	1	1	{guitar,beginers}
19	65	Chess Beginers	https://res.cloudinary.com/black-box/image/upload/v1733827903/jk1bvoshpevykl0ppvtp.jpg	f	t	2024-12-10 10:52:13.041	\N	\N	\N	{"chess,beginers"}
12	27	painting with oil	https://res.cloudinary.com/black-box/image/upload/v1726570326/tgpps9vwnn2lplanpqcw.jpg	f	f	2024-09-17 10:52:40.902	2024-09-17 10:54:06.788	\N	\N	{painting,oil}
17	20	chess 	https://res.cloudinary.com/black-box/image/upload/v1731418943/plhzdyb7ki7tz2qrf7ql.png	f	t	\N	\N	1	0	{chess}
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Message" (id, "senderId", "chatRoomId", content, "timestamp") FROM stdin;
\.


--
-- Data for Name: MessageRequest; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."MessageRequest" (id, "senderId", "receiverId", message, "timestamp", status, viewed) FROM stdin;
1	20	59	hello this is a request message	2024-12-03 12:23:10.763	PENDING	f
2	18	23	Hi	2024-12-12 07:24:11.86	PENDING	f
3	20	18	hello	2024-12-12 12:43:45.855	PENDING	f
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Notification" (id, "userId", "createdAt", description, img, "sentAt", status, title, "updatedAt") FROM stdin;
\.


--
-- Data for Name: Participants; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Participants" (id, course_id, participant_id) FROM stdin;
\.


--
-- Data for Name: Public_Post; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Public_Post" (id, user_id, caption, images, private, created_at, deleted, videos) FROM stdin;
2	4	<p><span style="color: rgba(0, 0, 0, 0.616);">Hey everyone! I’m excited to share my latest piece with you all. This painting, titled “Whispers of Twilight,” explores the transition between day and night, capturing that fleeting moment when the sky is painted in the most delicate shades of blue and gold. Let me know what you think in the comments!</span></p><p><span style="color: rgba(0, 0, 0, 0.616);">#Art #PainterLife #WhispersOfTwilight #NewArt #ArtInProgress #SupportLocalArtists</span></p>	{https://res.cloudinary.com/black-box/image/upload/v1725268435/z7ysuyvjmi0bzo5ensyz.png}	f	2024-09-02 09:14:06.05	f	{}
3	7	<p><span style="color: rgba(0, 0, 0, 0.616);">I’m thrilled to share my today’s special creation: Triple Berry Cheesecake!</span></p><p><span style="color: rgba(0, 0, 0, 0.616);">These bars are a creamy, decadent treat with a graham cracker crust, velvety cheesecake filling, and a vibrant mix of fresh berries on top. Each bite is a burst of fruity goodness combined with a rich, smooth texture that’s simply irresistible.</span></p>	{https://res.cloudinary.com/black-box/image/upload/v1725268588/tewasj6bclwlxnlrzupm.png}	f	2024-09-02 09:16:42.809	f	{}
4	4	<p><span style="color: rgb(0, 0, 0);">Unveiling My Latest Scrapbook Creation! 🥳</span></p><p><span style="color: rgb(0, 0, 0);">I’m excited to finally share my latest update on the scrapbook project with you all! Creating this scrapbook has been such a wonderful journey, filled with memories, creativity, and a touch of nostalgia.</span></p>	{}	f	2024-09-02 09:21:26.116	f	{}
5	8	<p><span style="color: rgba(0, 0, 0, 0.616);">What an incredible evening we had at the ESHA Foundation last night! 😮 The live classical music performance was nothing short of mesmerizing, and I just had to share how deeply moved I was by the experience.</span></p>	{}	f	2024-09-02 09:23:52.124	f	{}
6	8	<p>What an unforgettable evening we had at the ESHA Foundation last night! 😮 The live classical music performance was absolutely captivating, and I can't help but express how profoundly it moved me.</p>	{https://res.cloudinary.com/black-box/image/upload/v1725269059/kgoray5o8ix6qi1acju5.jpg}	f	2024-09-02 09:24:45.814	f	{}
7	10	<p><span style="color: rgba(0, 0, 0, 0.616);">Nestled in the heart of a quaint village, Manjappa brings to life the timeless art of pottery with a unique touch. As the village potter, he has spent years perfecting the craft, creating stunning, hand-thrown ceramics that reflect the serene beauty of rural life.🤯</span></p><p><span style="color: rgba(0, 0, 0, 0.616);"> With a deep connection to nature and tradition, his work is characterized by its earthy glazes and intricate designs inspired by the local landscape. </span></p>	{}	f	2024-09-02 09:27:57.891	f	{}
9	4	<p>Hey everyone! I’m excited to share my latest piece with you all. This painting, titled “Whispers of Twilight,” explores the transition between day and night, capturing that fleeting moment when the sky is painted in the most delicate shades of blue and gold. Let me know what you think in the comments!</p><p>#Art #PainterLife #WhispersOfTwilight #NewArt #ArtInProgress #SupportLocalArtists</p>	{https://res.cloudinary.com/black-box/image/upload/v1725269418/yaceonizwlqciadsb1el.png}	f	2024-09-02 09:30:25.937	f	{}
10	7	<p>I’m thrilled to share my today’s special creation: Triple Berry Cheesecake! 😋</p><p>These bars are a creamy, decadent treat with a graham cracker crust, velvety cheesecake filling, and a vibrant mix of fresh berries on top. Each bite is a burst  of fruity goodness combined with a rich, smooth texture that’s simply irresistible.</p>	{https://res.cloudinary.com/black-box/image/upload/v1725269484/fxqogekq6f09ela9c9jv.png}	f	2024-09-02 09:31:39.774	f	{}
11	4	<p>Unveiling My Latest Scrapbook Creation! 🥳</p><p>I’m excited to finally share my latest update on the scrapbook project with you all! Creating this scrapbook has been such a wonderful journey, filled with memories, creativity, and a touch of nostalgia.</p>	{}	f	2024-09-02 09:32:55.04	f	{}
12	4	<p>Unveiling My Latest Scrapbook Creation! 🥳</p><p>I’m excited to finally share my latest update on the scrapbook project with you all! Creating this scrapbook has been such a wonderful journey, filled with memories, creativity, and a touch of nostalgia.</p>	{}	f	2024-09-02 09:33:06.803	f	{}
14	26	<p><strong>Hello hello Black-Box Community !!!</strong></p>	{https://res.cloudinary.com/black-box/image/upload/v1725610247/puiem6gmvzimkkrpd8cm.jpg}	f	2024-09-06 08:11:24.435	f	{}
15	26	<p>🕶️</p>	{}	f	2024-09-06 09:06:32.984	f	{}
16	26	<p>🕶️</p>	{}	f	2024-09-06 09:07:47.56	f	{}
18	24	<p>:)</p>	{}	f	2024-09-10 05:02:38.858	f	{}
19	20	<p>Welcome to  blackbox community</p>	{}	f	2024-09-12 08:47:05.001	f	{}
20	18		{}	f	2024-09-13 16:59:21.303	f	{}
21	48		{https://res.cloudinary.com/black-box/image/upload/v1726467935/ipsemmutt9x92ycmj5no.jpg}	f	2024-09-16 06:26:00.516	t	{}
22	26	<blockquote class="ql-align-center">“<em>Develop a passion for learning. If you do, you will never cease to grow.”</em>&nbsp;—&nbsp;<strong>Anthony J. D’Angelo</strong></blockquote>	{}	f	2024-09-16 10:42:33.114	f	{}
23	27	<p>hello and welcome to the camp of learning</p>	{}	f	2024-09-18 06:34:20.311	t	{}
24	20		{}	f	2024-09-20 11:05:16.553	f	{}
25	18		{}	f	2024-09-20 17:21:01.945	f	{}
26	25	<p>welcome to the world of learning </p>	{}	f	2024-09-23 05:45:28.694	f	{}
27	26	<p>#photography</p>	{https://res.cloudinary.com/black-box/image/upload/v1727073553/vq39jcyczmatmjzwggq7.png}	f	2024-09-23 06:39:36.65	f	{}
29	26	<p>#photography</p>	{https://res.cloudinary.com/black-box/image/upload/v1727073553/vq39jcyczmatmjzwggq7.png}	f	2024-09-23 06:57:33.451	t	{}
28	26	<p>#photography</p>	{https://res.cloudinary.com/black-box/image/upload/v1727073553/vq39jcyczmatmjzwggq7.png}	f	2024-09-23 06:39:48.814	t	{}
30	20	<p>#Nature beauty</p>	{https://res.cloudinary.com/black-box/image/upload/v1727076732/lnoskmcmo3cf7ynamr2s.avif}	f	2024-09-23 07:33:20.901	f	{https://res.cloudinary.com/black-box/video/upload/v1727076794/z731qamxjrizrh1ayevl.mp4}
31	25		{}	f	2024-09-23 11:56:33.527	f	{https://res.cloudinary.com/black-box/video/upload/v1727092585/r9mta4ivd8ifmhhotqjd.mp4}
32	25		{}	f	2024-09-23 11:56:38.993	t	{https://res.cloudinary.com/black-box/video/upload/v1727092585/r9mta4ivd8ifmhhotqjd.mp4}
33	20	<p>Hello good morning</p>	{https://res.cloudinary.com/black-box/image/upload/v1727162495/d8nvktkcmgh3sxpulklf.png}	f	2024-09-24 07:22:35.126	f	{https://res.cloudinary.com/black-box/video/upload/v1727162537/ixlpanmhqdrbwyzjcvf5.mp4}
34	24	<p>Mystery lights paint Bangalore sky</p><h1><br></h1><p><br></p>	{https://res.cloudinary.com/black-box/image/upload/v1727769128/lbepyrzevlcvowbwyg0i.png}	f	2024-10-01 07:53:03.588	f	{}
35	25	<p>Teaching is the greatest act of optimism. </p>	{}	f	2024-10-07 05:53:46.062	f	{}
36	25	<p>Teaching is the greatest act of optimism.</p>	{https://res.cloudinary.com/black-box/image/upload/v1728280576/ciburxiahhu1z6enhxmz.avif}	f	2024-10-07 05:56:27.069	f	{}
68	58		{}	f	2024-10-07 06:46:24.582	f	{}
69	58	<p>Every Canvas is a journey all it's own. </p>	{}	f	2024-10-07 06:47:44.218	f	{}
70	58	<p><br></p>	{https://res.cloudinary.com/black-box/image/upload/v1728283704/a8oh9xmvhsjmefugxfl8.png}	f	2024-10-07 06:48:37.717	f	{}
71	58	<p>Embrace the colors of life </p>	{}	f	2024-10-07 06:52:16.999	f	{https://res.cloudinary.com/black-box/video/upload/v1728283877/a9l0s1tekdy62noqmdxm.mp4}
72	58		{}	f	2024-10-07 07:02:04.106	f	{}
73	59	<p>Art</p>	{https://res.cloudinary.com/black-box/image/upload/v1728375162/spdhbuxf043z08m3bgfh.jpg}	f	2024-10-08 08:13:27.711	f	{}
74	59	<p>Art</p>	{https://res.cloudinary.com/black-box/image/upload/v1728375162/spdhbuxf043z08m3bgfh.jpg}	f	2024-10-08 08:13:37.664	t	{}
75	24	<p>#Bikes</p>	{https://res.cloudinary.com/black-box/image/upload/v1728456315/o5ofedgpjpj3rtmrg93j.jpg}	f	2024-10-09 06:46:21.136	t	{}
76	2	<p>Hello to the Black Box Community. Is anyone out there?</p>	{}	f	2024-11-07 18:20:17.901	f	{}
77	2		{}	f	2024-11-08 06:39:19.101	t	{https://res.cloudinary.com/black-box/video/upload/v1731047925/zphux4wimgymo1kbf0lk.mov}
78	69	<p>hey i am back</p>	{"https://d2f7i2k65rgoj5.cloudfront.net/images/1740984208020-1000003288 (1).png",https://d2f7i2k65rgoj5.cloudfront.net/images/1740984212946-1000003288.png,https://d2f7i2k65rgoj5.cloudfront.net/images/1740984218291-1000003289.jpg}	f	2025-03-03 06:43:52.474	f	{"https://d2f7i2k65rgoj5.cloudfront.net/videos/1740984223821-Baking a Cake Animation _ Mayka.mp4"}
\.


--
-- Data for Name: Reactions; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Reactions" (id, course_id, reactor_id, heartful, classroom_course_id) FROM stdin;
\.


--
-- Data for Name: Suggest; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Suggest" (id, email_id, course_id, suggested_by, participant_id) FROM stdin;
\.


--
-- Data for Name: User_Info; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."User_Info" (id, user_id, "whatBrings", "currentIndustry", "heardBy", dob, languages, education, "currentCompany", awards, flink, xlink, tubelink, linkedin, "interestedTags", location, skilss, headline) FROM stdin;
1	5	Personal interest	\N	SocialMedia	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Health,Marketing,Photography,"Arts and Crafts",Design,Baking,"Culinary Arts"}		{}	\N
5	4	Pick up a new hobby	\N	E-mail	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Health,Writing}		{}	\N
8	27	Pick up a new hobby	\N	E-mail	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Pottery}		{}	\N
10	28	Skill development	\N	SocialMedia	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Music,Health,"Arts and Crafts"}		{}	\N
11	34	\N	\N	\N	\N	{}	\N	\N	\N	\N	\N	\N	\N	{}		{}	\N
7	26	Pick up a new hobby	\N	Other	\N	{}	\N	\N	\N	\N	\N	\N	\N	{"    "}	Bengaluru	{"      Drawing"}	No headline 
9	25	\N	\N	\N	\N	{}	\N	\N	\N	\N	\N	\N	\N	{" dance"," draw"," paint"," craft "}	bangalore	{"   content creation "}	artist 
6	1	Learning	\N	Google	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Wellness}		{}	\N
13	58	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	{Drawing," dancing"," cooking"," reading "}	Bangalore 	{""}	Dancer & painter
12	24	\N	\N	\N	\N	{}	\N	\N	\N	\N	\N	\N	\N	{" Bikes"," Cars"," Jeeps"," Animals"}	Bangalore	{""}	Biker, painter, cook, travel enthusiast
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Users" (id, provider, img_thumbnail, first_name, last_name, email, phone_num, password, about, admin, created_at, otp, verified, classroom_id, updated_at, backbanner) FROM stdin;
1	email/phone	https://res.cloudinary.com/black-box/image/upload/v1713474944/y0yajvymramdkiwfvkby.jpg	Vikash	Kumar	iampriyanshu1009@gmail.com	911234567891	$2b$12$4OZouiIDQ5wCrqYwpCqVSeBHJVbqgbTlM2EP/1LN4GnhThveBLBl.	I am just a mere developer thriving to flood you with my knowledge	f	2024-04-18 21:15:46.002	0	f	\N	2024-04-18 21:15:46.002	
3	email/phone	https://res.cloudinary.com/black-box/image/upload/v1715845461/kvx83f1lbfkoqvox6usn.jpg	Priyanshu	Mishra	iampriyanshu9@gmail.com	917011710495	$2b$12$.3BnKG3116lWwfYbgciLheTFb51Rs02kVNnoUL3fgtOt69wj9VJoi	 I  am developer	f	2024-05-16 07:44:22.334	0	f	\N	2024-05-16 07:44:22.334	
4	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/mehendi.png	Radhika	Maheshwari	radhika23@gmail.com	913242394229	$2b$12$o4r8LLq4YA1RJyt1GfEhN.TGqFU7bZ8jfBo3mv.ExCQPSdkSGFScS		f	2024-08-07 06:37:40.943	0	f	\N	2024-08-07 06:37:40.943	
6	email/phone		admin	here	admin@blackis.in	913232939239	$2b$12$F0CcLBjRJdxLNAiSDqk2U.4PeGGb4wXhlo75qc6jpk.IJWmnegRWi		f	2024-08-07 06:51:50.586	0	f	\N	2024-08-07 06:51:50.586	
24	google	https://res.cloudinary.com/black-box/image/upload/v1726812827/nnwkz8x18vhnpf2wlspf.png	Nethra	Kodira	nethra@blackis.in	\N	$2b$12$S.xzSgyzD/4twHL/O8n5oOvXhGQb4kIwipf7/qgdMHYDoKdP3.9iO	Always Changing. Constantly Evolving.	f	2024-09-04 06:09:04.447	0	f	\N	2024-09-04 06:09:04.447	
8	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/geetha.png	Geetha	Sreya	geetha23@gmail.com	912131203901	$2b$12$ejFt2OqS.GCSv4REOyQxzuSlLvOAMfE7AB04x8a/vXvAwLy1Qvshm		f	2024-08-07 07:02:44.975	0	f	\N	2024-08-07 07:02:44.975	
9	email/phone		anshu	mishra	anshau@gmail.com	913242342332	$2b$12$LZ5yVzGOn1nzjol4i9vRROvVTktAYkjHvTUIJN21JvVblVTCFnJ9G		f	2024-08-07 10:05:42.804	0	f	\N	2024-08-07 10:05:42.804	
10	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/chessPlayer.png	Mayur	Vispute	mayur23@gmail.com	912101010101	$2b$12$SOvAZXByLIofoa1NcyoEb..X1UPnFbalp/A.RZGIPjlxfJCnq/cWa		f	2024-08-09 07:55:12.376	0	f	\N	2024-08-09 07:55:12.376	
11	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/scirence+guy.jpg	Gyan	Chauhan	gyan23@gmail.com	912131231231	$2b$12$dCZg5oNcnEeS1PWLgqxfreNav3oZLVd3JpZ59hArAQ6DiZYWEAkTe		f	2024-08-09 08:10:13.677	0	f	\N	2024-08-09 08:10:13.677	
25	google		Vaidehi	r.v	vrv866330@gmail.com	\N	$2b$12$6Jlkp7.AF42swo4Lh2p0su5yclJYhpCYOkCHdtev69l9URN5wtE2y	I'm a mural artist 	f	2024-09-06 08:04:26.822	0	f	\N	2024-09-06 08:04:26.822	
13	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/Anderson.png	Anderson	A	anderson23@gmail.com	912121910023	$2b$12$b0sleYhKXsUI6ZBwD5H/jehaVC0/hxBKRqCS.VOvp5j5pcHVeUC.a		f	2024-08-09 09:33:16.232	0	f	\N	2024-08-09 09:33:16.232	
14	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/manya.png	Manya	T	manya23@gmail.com	912329320390	$2b$12$NlyJa0/c0okIyeJLgOJrAefmhuAhg0hwI7pjNgLM0LHWXMeczkiKi		f	2024-08-09 10:17:25.095	0	f	\N	2024-08-09 10:17:25.095	
15	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/clara.png	Clara	B	clara23@gmail.com	912329832989	$2b$12$foakq.JYYTmy7EgsfPi.POMbXMZbvAxcGCTXnQRB9IKQwtyGT02Nu		f	2024-08-09 10:28:19.677	0	f	\N	2024-08-09 10:28:19.677	
16	email/phone		Vikash	Mishra	testEmail2@gmail.com	913456765432	$2b$12$aE6fC/.K5c5O0ouw8qchAeQ9MQW64e5z3J7.tkGRcfEBqcpvKbeZ.		f	2024-08-13 06:19:19.219	0	f	\N	2024-08-13 06:19:19.219	
12	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/hannnnnnnna.png	Haanya	NA	hanya23@gmail.com	912323232234	$2b$12$maP3kK7rIPA2TuIMMhLGme2FN5NDh/2xecr0EEIvcrsFabx6AzBrO		f	2024-08-09 08:20:17.534	0	f	\N	2024-08-09 08:20:17.534	
17	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/daisy.png	Daisy	A	daisy23@gmail.com	912132343533	$2b$12$rm7hzPgKxv4MIOfKvgOomu.5XETrD.QKc1MYde5X7/tc1IP1v6p6i		f	2024-08-13 11:08:55.67	0	f	\N	2024-08-13 11:08:55.67	
5	email/phone		Nethra	Kodira	tins.kodira4@gmail.com	917349475301	$2b$12$xXoIdexgbnr5F9Z2habLdeoGf/.mqaFYoPQ8uoBFUMryrgZVtaRpW		f	2024-08-07 06:41:29.651	0	f	\N	2024-08-07 06:41:29.651	
19	email/phone		sampath	kumar	sampatk64@gmail.com	919900027064	$2b$12$e5MapXw27zzGcSwZc/lLseozK6biYbSXS5Vg2YEcJOEuhph4Iobae		f	2024-08-28 08:25:18.377	0	f	\N	2024-08-28 08:25:18.377	
20	google	https://lh3.googleusercontent.com/a/ACg8ocJyNjhhSY8MiGSj1hCb0ssAkHjJHp5S6Xi5sBJB5RPf2uZJSA=s96-c	Priyanshu	Mishra	priyanshu@blackis.in	\N	$2b$12$A9IPACY7hY3M6OenUUOIcuZoUedKuc1OfYew5dBqlUMgDdYCH4mHG	\N	f	2024-08-31 18:24:41.945	0	f	\N	2024-08-31 18:24:41.945	
21	email/phone		user	user	user@gmail.com	919876543210	$2b$12$E7X1qzwfPo8mFkYTjL/vX.LsgwN3OuDeotqV4lKMs6a7QgskwgZci	hi ajdhsjj	f	2024-09-03 16:01:02.216	0	f	\N	2024-09-03 16:01:02.216	
22	email/phone		user	user	us@gmai.com	913692550187	$2b$12$JjkzxDvJQwSCOF5TxkFGHuM.n04fc0c25CTfvACqH3phJCjiCQ13C	gshsjn. dd dhdjue	f	2024-09-03 16:10:46.303	0	f	\N	2024-09-03 16:10:46.303	
30	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725629757/nhkc5rzs3bbxgh9pzjc0.png	Sruthi		sruthi23@gmail.com	913293284738	$2b$12$Pb8zS/gjwzkeKqQ3MUpZP.Vp6xjLvxcZeJCGAmsA5s.JsNoCgo/SC		f	2024-09-06 13:35:36.129	0	f	\N	2024-09-06 13:35:36.129	
28	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725625612/gwzzg5dz3eloaphqsbub.png	Vikash	Kumar	aojsaosn33@gmail.com	912123233454	$2b$12$GwdPyqSpJs9JNz9QqH4Az.FevrNHIV8UVs4SbbXeE9zOnhixPHT1u		f	2024-09-06 11:09:44.962	0	f	\N	2024-09-06 11:09:44.962	
29	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725629231/mqbidtdatgctnljvq2f5.png	Sneha	K S	sneha23@gmail.com	917374775575	$2b$12$qpUJkZWny/wRdnwGj45mx.UqhXFoR7ql2sZOu0tHvy8wLKaa08APG		f	2024-09-06 13:21:48.583	0	f	\N	2024-09-06 13:21:48.583	
31	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725630397/tjkjpxgcjjapbm6zc7dn.png	Ayush	Jain	ayush23@gmail.com	918765456776	$2b$12$ywA71r8shTKQYITR6sX9x.ufbQBdjFgG.SEtOw/NMtOYM4nswGZBC		f	2024-09-06 13:44:39.043	0	f	\N	2024-09-06 13:44:39.043	
32	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725630853/cnc1je6yrnxbahdn2t9z.png	Aryananda		aya23@gmail.com	913456766543	$2b$12$VwFuMWeX5e4oc.3X6Y6cSeJExxpE0.dwHfwsOQHqhqdDggq5mpiEO		f	2024-09-06 13:53:18.523	0	f	\N	2024-09-06 13:53:18.523	
27	email/phone		Vikash	Kumar	newemail@gmail.com	912103120391	$2b$12$CavjotOOw8LQf4kQDMnlt.sKar8Ii2YGOK19mMdRaex0yLOg5pDfe		f	2024-09-06 08:48:27.761	0	f	\N	2024-09-06 08:48:27.761	
23	email/phone		Pradeesh 	A A	pradeesh.aa@gmail.com	917736836007	$2b$12$A65gUa46QqbcfaixNL6vgOav6k5dIt2QOHbSHYEDXEdfwgvjLKfgK	fine artist\n	f	2024-09-04 05:56:14.147	0	f	\N	2024-09-04 05:56:14.147	
7	email/phone	https://bask-s.s3.ap-south-1.amazonaws.com/neethi.png	Neethi	Rao	neethi23@gmail.com	+913894934896	$2b$12$39EF8N1gAMIQv/BEJHpKgOvNKMkqsjVfy37QW69jrNjo55dbmFSAy		f	2024-08-07 06:53:18.495	0	f	\N	2024-08-07 06:53:18.495	
2	email/phone	https://res.cloudinary.com/black-box/image/upload/v1713506989/i3tw4k5hhere554hz2en.jpg	sampath	kumar	sampath@blackis.in	919900027097	$2b$12$mS759dq/oXB9Xo3bwfjvvOPXHSbsRZpa.PqSs.cU9yeXBn15/mciW	jkHkhkHNKJMNN 	f	2024-04-19 06:09:50.687	0	f	\N	2024-04-19 06:09:50.687	
18	email/phone	https://res.cloudinary.com/black-box/image/upload/v1734007424/guvrnjtokgqjjqvhkcyj.jpg	sampath	kumar	sampatk@gmail.com	919900027097	$2b$12$lZFwNJaMwXASkC9.bPTlbefGGVEHDk04O7ZFLR8hE1QYQjZBCANFa		f	2024-08-28 08:04:09.054	355301	f	\N	2024-08-28 08:04:09.054	
33	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725631250/rpqd4vsnklrvbuapszw2.png	Sreelakshmi	Sudheesh,	sreelakshmi23@gmail.com	912345676543	$2b$12$TeQY.V01oCGbEcMKKLy2sOQz3bPPlUypfMG49osrt39gKWr5gCEDq		f	2024-09-06 13:59:07.428	0	f	\N	2024-09-06 13:59:07.428	
47	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726119493/k9rzsttb8sjaywyvafn3.png	Arun	Sankar	Arun23@gmail.com		$2b$12$GsNsNx2uBmeSwXfFKowJAeQpNV1zXDUO8mrGHGO93O9AGI9H6kH8O		f	2024-09-12 04:30:49.11	0	f	\N	2024-09-12 04:30:49.11	
35	email/phone		Gowri	S	gowri94@yahoo.com	919447600555	$2b$12$mXHgTI1wD/O5Ww2qpmGgBOZV60IiKarqttZf97adwvamal.IfGPiS		f	2024-09-09 05:59:39.378	0	f	\N	2024-09-09 05:59:39.378	
36	email/phone		Gow	S	gowei994@gmail.com	919447600555	$2b$12$1M5jeZz2E1naksqfUoINsOl0bE23bzuE0f3Wny8DGCqFP5tSoLS9a		f	2024-09-09 06:00:31.192	0	f	\N	2024-09-09 06:00:31.192	
48	email/phone		Vaidehi 	RV	vrv866330@gmail.com 	917559938624	$2b$12$l228BvGZLnq9NanW9hllQuAub/xaVDyyfm8PUC9iAiaByVxVDqBx2		f	2024-09-16 05:28:32.319	0	f	\N	2024-09-16 05:28:32.319	
34	email/phone	https://res.cloudinary.com/black-box/image/upload/v1725631669/uqe0chicosj4ude8bl67.png	Shikha	G	shikha23@gmail.com	912389324322	$2b$12$IzjEvuRYGyglDoMFTsIDbucW7X6GHV72JLbYw/iCOEqu4xRAwTgRC		f	2024-09-06 14:07:23.793	0	f	\N	2024-09-06 14:07:23.793	
63	email/phone		kanisha	alur	kanisha@blackis.in	919980755307	$2b$12$R0WAw8cFHLTKOSVCveuaSO4rfZxbsR.iiCZ5I0On6X1jwypmjpNBm		f	2024-12-05 07:37:52.898	0	f	\N	2024-12-05 07:37:52.898	
39	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726043875/oobhmmk4w1rvh8bjnkb9.png	Ruchi	P	ruchi23@gmail.com	919876578987	$2b$12$/ILinjufE5/EvEQKBVbRTOlyNPgwFNyB1xfhBFZVMwUZCNclCSxu6		f	2024-09-11 08:25:08.811	0	f	\N	2024-09-11 08:25:08.811	https://res.cloudinary.com/black-box/image/upload/v1726474645/v8g1x5klcxjqjpskvixe.jpg
26	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726484547/ghnrlaa6xs3chn3co53e.png	Gowri	Subramoniam	gowri@blackis.in	919447094460	$2b$12$4s4vCuiGeOXlc.R8.SaY6eJEcwt6vub4mlBafO6JaLlobDmDQU7jS		f	2024-09-06 08:05:25.856	0	f	\N	2024-09-06 08:05:25.856	
49	email/phone		vhdev	bhb	hhh@gmail.com	916999999999	$2b$12$UD6hggLYkFiMiHqwSn0foe9oXz8LuVIbClnW.lF3LY1hnFSAelYZe	hehbe\n	f	2024-09-17 09:56:43.668	0	f	\N	2024-09-17 09:56:43.668	
50	email/phone		Vaidehi 	RV	vandhuvish@gmail.com	917559938624	$2b$12$pX4BBnnuV3NXmxXbXn6XZeSptOiiJWX0Jbjjj16c9nJWHiT6Qk286		f	2024-09-20 09:59:05.524	0	f	\N	2024-09-20 09:59:05.524	
51	email/phone		Sanya	KN	kodirasanya@gmail.com	917022348936	$2b$12$VZnrblW.uVMT99nnQj7KXunPERCwER7fI7FcmiFIGdvLtLOS35oRy		f	2024-09-20 10:06:26.528	0	f	\N	2024-09-20 10:06:26.528	
58	email/phone	https://res.cloudinary.com/black-box/image/upload/v1728284310/etwyhkuacfftyfbgwfcv.png	Vaidehi 	RV	vaidehivijay913@gmail.com	917559938624	$2b$12$muZjdjo7I3/G2shQfhpFO.mz/dft8h1I8yoQl0V7GtxYr9cEBPruW	I'm a self taught mural painter, and professional classical dancer 	f	2024-10-07 06:46:12.822	0	f	\N	2024-10-07 06:46:12.822	
37	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726041575/hkxc7ijjya7nyw3qf50n.png	Success	U	sucess23@gmail.com		$2b$12$abAgBWADZLtY4lXnXdWrnueYSAOOQKi0ZAACXZ326dTDxJWiO35Fm		f	2024-09-11 07:46:18.375	0	f	\N	2024-09-11 07:46:18.375	
38	email/phone		Anshu	Kumar	ansh2112u@gmail.com	914567754322	$2b$12$aiBQlmdmMepRXjyGWPJ6NOVghQLuUydhx0JW6QlP075awj8gro8je		f	2024-09-11 08:25:00.449	0	f	\N	2024-09-11 08:25:00.449	
40	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726050033/cmvycwvf5zseapd24ksd.jpg	Shaurya 	S	Shaurya23@gmail.com		$2b$12$bkh8lNc2/HFFYUVXV2RqveAhupOFBJc6syKkbdbg8EHaqFYui5ukC		f	2024-09-11 08:59:11.379	0	f	\N	2024-09-11 08:59:11.379	
41	email/phone		Ruchi	k	nethra33@blackis.in	919876789678	$2b$12$pXGyoOw2OTL0sgNGLWpHCu9kGExPcDDjrQhzNhfAzwkpKdJg5gk8C		f	2024-09-11 10:46:10.934	0	f	\N	2024-09-11 10:46:10.934	
44	email/phone		Ruchi	k	sucess2333@gmail.com	919876789678	$2b$12$dHa7FC.KoirMP7V4MIAqMuLtnDz/RqOf13IBbyi2IO8TCNhfkfGBS		f	2024-09-11 10:46:43.127	0	f	\N	2024-09-11 10:46:43.127	
45	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726052282/ursewezvlebjge4tlqc8.jpg	 Anubha	Gupta	gupta.anubha02@gmail.com		$2b$12$DFUEof.XeWwUsiK1Vg4rSuXzYCaZ793c4Oyf2XwzM3/UDH/g5D2ka		f	2024-09-11 10:48:38.215	0	f	\N	2024-09-11 10:48:38.215	
46	email/phone		Honey 	G	honeygoyal0640@gmail.com		$2b$12$tiqGEM67jR4wqxtN1pVykeF4vPtm1aEgWGBnl9VqAdtVo9JuaYe5O		f	2024-09-11 11:24:10.899	0	f	\N	2024-09-11 11:24:10.899	
52	email/phone	https://res.cloudinary.com/black-box/image/upload/v1726833366/mb3vwbcvh5ezt2r1xlqk.jpg	Surya	Reddy	suryareddyc1@gmail.com	919550271381	$2b$12$v.VdYLyqHu92m0XZmcWqUuh.mzjOt5kxU88I7MoTYtYTlmU3bYxtO		f	2024-09-20 11:50:19.853	0	f	\N	2024-09-20 11:50:19.853	
54	email/phone		Vikash	Artmosphere	artmosphere2012@gmail.com	912923947232	$2b$12$gOFUvKhoKHrPepXtC8krCeybr//3pmkLxNzv4KHdXpPWNn5XBJKcS		f	2024-10-01 06:36:27.302	0	f	\N	2024-10-01 06:36:27.302	
57	google	https://lh3.googleusercontent.com/a/ACg8ocIYC1ZuDsoFxoWgutanH7QM1ceDui772keyFq19-_EJO3SXXd1I=s96-c	Vikash	Kumar	vikash21@navgurukul.org	\N	$2b$12$UIFBYGWEl/hD1Cx4JSk2p.MkgbLRda.8S6hziHBQ7gHI7dxUIas3e	\N	f	2024-10-01 14:42:00.995	0	f	\N	2024-10-01 14:42:00.995	
64	email/phone		Priyanshu	Mishra	iampriyanshu19@gmail.com	916351822558	$2b$12$M/AUnNv6yYFquYbgRzG4vOiJmIky8SHl8ZBLHm6R/2kesBD0eG24m		f	2024-12-09 10:16:29.1	0	f	\N	2024-12-09 10:16:29.1	
59	email/phone	https://res.cloudinary.com/black-box/image/upload/v1728378338/wlcjoxzl9qpuyjtyuv0z.png	Nirmal	Jones	nirmal@blackis.in	918145624685	$2b$12$OO1WIZREglOWGQkxoUtpfuKiBYplCzEP3B8yK1KvDglxvlnWXPBJK		f	2024-10-08 08:10:49.136	0	f	\N	2024-10-08 08:10:49.136	
60	google	https://lh3.googleusercontent.com/a/ACg8ocJquzkcaSqrAYrYOldTahicCFbWZ5w80T03DV2QP477A6ws3D4=s96-c	Irfan	Irfu009	irfanirfu009@gmail.com	\N	$2b$12$Bh0e19BdCStoo3zPnK5jeOx00Gy5I8IroKP4il/6ghe2VCMoQ04Ma	\N	f	2024-10-09 13:02:10.692	0	f	\N	2024-10-09 13:02:10.692	
61	google				samanthachavez.55822@gmail.com	\N	$2b$12$jVKJko08YBNPz1..UqhwlO6bnqgUElLUXur0szwbKrieYCAtXTqki		f	2024-11-12 12:36:05.789	0	f	\N	2024-11-12 12:36:05.789	
62	email/phone		New	Request	emailisfine@ss.com	913233323423	$2b$12$s7LdI9d.qyNnDhj1yNztgu8qkpZA4sR27wZKO1XC/mB46qyDx7olW		f	2024-11-27 11:45:42.925	0	f	\N	2024-11-27 11:45:42.925	
65	email/phone		Priyanshu	Mishra	iampriyanshu129@gmail.com	911298372629	$2b$12$6HEW6Va5VaAHv67Q8qTtXuJJ9t7DDW8vB117EyXMvULTbWZrfRInG		f	2024-12-10 10:38:53.002	0	f	\N	2024-12-10 10:38:53.002	
66	google		Srinidhi	G V	srinidhigv03@gmail.com	\N	$2b$12$27WlfIVdTCbQVHjlob8qk.HIIOauopHg7PGuKMH1jwleCI./B/r7C	\N	f	2025-01-09 11:05:34.763	0	f	\N	2025-01-09 11:05:34.763	
67	google	https://lh3.googleusercontent.com/a/ACg8ocKspcddKDYvjARoC_w43lv5Be2lfXLwS9fhXxgzJqcyb5y3p39I=s96-c	Srinidhi	Vasishta	srinidhivasishta03@gmail.com	\N	$2b$12$l5UM4UQdlX7ZDx/48uIPkehydAsC62CDYzRM6KKxSxPXrvXb/RWYe	\N	f	2025-01-27 10:46:10.35	0	f	\N	2025-01-27 10:46:10.35	
68	email/phone		ddd	ddd	dd@gmail.com	918236486236	$2b$12$a9xJ.5cwCX8E1M/rWdw93OU7u9tluDyh/80eKXi/4PJaDsgQSNqri		f	2025-01-29 07:37:18.49	0	f	\N	2025-01-29 07:37:18.49	
72	email/phone		askdn	askdn	askdn@skdnf.com	912131231221	$2b$12$YrXbtrRZCns2ckBvMUrwGuBV3cK8fAmEZ7h1/OyuvM43boYjpPXfO		f	2025-02-28 07:23:22.377	0	f	\N	2025-02-28 07:23:22.377	
69	email/phone	https://d2f7i2k65rgoj5.cloudfront.net/profile-images/1740985647743-1000003289.png	weaaa	ewaaa	awe@33.vp	912345421234	$2b$12$KPAgE9oVJ0psStrnp4mGButahjIiaqxiVyPRp4TimYLUGIogLdJoW		f	2025-02-15 11:43:04.349	0	f	\N	2025-02-15 11:43:04.349	https://d2f7i2k65rgoj5.cloudfront.net/back-banners/1740985754718-Frame 1000009509.png
\.


--
-- Data for Name: Vid_Classes; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Vid_Classes" (id, name, course_id, classroom_course_id) FROM stdin;
\.


--
-- Data for Name: Wishlist; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."Wishlist" (id, user_id) FROM stdin;
1	26
2	24
3	18
4	25
\.


--
-- Data for Name: _Book_mark_PostToPublic_Post; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_Book_mark_PostToPublic_Post" ("A", "B") FROM stdin;
1	12
3	12
3	14
7	16
7	18
4	26
2	10
2	12
2	18
2	20
8	3
8	6
9	14
9	27
\.


--
-- Data for Name: _CartToCourse_V; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_CartToCourse_V" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _ClassCart; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_ClassCart" ("A", "B") FROM stdin;
9	12
10	12
\.


--
-- Data for Name: _ClassWishlist; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_ClassWishlist" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _Course_VToWishlist; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_Course_VToWishlist" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _Liked_PostToPublic_Post; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_Liked_PostToPublic_Post" ("A", "B") FROM stdin;
7	16
1	12
1	22
2	11
2	15
2	16
6	22
8	2
8	7
8	10
9	11
9	18
9	22
9	27
5	14
10	77
3	16
3	73
11	76
\.


--
-- Data for Name: _UsersRelation; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public."_UsersRelation" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: bask
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
37386f59-8860-4f82-8205-feed848d28cf	7f2ddc8ead2201e9227f47ada45b7d282cbb52c5c82d576ef4aedc5961e62eff	2024-04-19 01:42:38.672229+05:30	20221128083520_the_setup17	\N	\N	2024-04-19 01:42:38.668706+05:30	1
a508a3e8-66f6-4b47-9da7-be5cf7319677	aa1a5e5874590f05e53a4f45b281518537832db4cce53f1292faea3f9a5906b0	2024-04-19 01:42:38.513125+05:30	20220823003533_the_setup	\N	\N	2024-04-19 01:42:38.423363+05:30	1
5a72d8a7-91de-40fd-97d5-c667326e99ee	3e2187814135d50a60bf603b1504992cc41b9f45dc1c9c729fb4aaae5fb1dce8	2024-04-19 01:42:38.594274+05:30	20220913103411_the_setup14	\N	\N	2024-04-19 01:42:38.591154+05:30	1
40be09d9-345a-4a87-9f6b-82ad06daabdc	0029f78034ad5104d2c184ee09968c21322669909e7e2f9c4702e02aa44d64b3	2024-04-19 01:42:38.52508+05:30	20220823011022_the_setup2	\N	\N	2024-04-19 01:42:38.514484+05:30	1
cb047434-2e74-466c-a408-fad02ff1f723	617b95f54a5ddc03743cb9f65ba6784a4434f6d2b34c8b05dab82a9543939832	2024-04-19 01:42:38.530842+05:30	20220823011940_the_setup3	\N	\N	2024-04-19 01:42:38.526298+05:30	1
d64b49a2-8740-477c-9013-c85eb7124394	e9eb7dc4a7dc962dca85a4cc0b6a857c8514b3ad2afd53fb68c8a63f0da05693	2024-04-19 01:42:38.535428+05:30	20220823012351_the_setup4	\N	\N	2024-04-19 01:42:38.531997+05:30	1
9e58f58a-2c78-4ae8-8654-3e9d14a34a2b	2b0c448b176989df9d1beb6b422a50fab7561776c5ba648290c7c0b924759830	2024-04-19 01:42:38.598864+05:30	20221110100329_the_setup15	\N	\N	2024-04-19 01:42:38.595376+05:30	1
61cf9ce7-f9bb-40ec-b783-10b70205def3	5b95ca4a5f164c7ec009faaf371a021d769e78eb26d7b95b201c47b55ac6c279	2024-04-19 01:42:38.539966+05:30	20220823075222_the_setup5	\N	\N	2024-04-19 01:42:38.53669+05:30	1
9d2a635f-ea19-466c-9129-486e05d9938d	f5738262c6aae6dc261bd091c5d3523042e76ed11998c08e4d296a19be62dd8c	2024-04-19 01:42:38.544536+05:30	20220823125025_the_setup6	\N	\N	2024-04-19 01:42:38.541056+05:30	1
862b7de8-2bd1-47e4-9fb1-1c07dae4867e	c61ee8f9cf7ae75987bdeec2155d372e7f0e2f35d06c297081479cbbbd37369d	2024-04-19 01:42:38.725059+05:30	20240313100344_your_migration_name	\N	\N	2024-04-19 01:42:38.717709+05:30	1
28d45cd0-ce3a-4b1b-8f43-72700ed4caf1	0922e8f119c84e11a3d69ad4dc27dd5ad59fb42db4b769060397936e463f787a	2024-04-19 01:42:38.549602+05:30	20220825083614_the_setup7	\N	\N	2024-04-19 01:42:38.54565+05:30	1
457cf202-22dc-4ad2-9606-2e2bdae5bbcb	eab5de36bd2fee3f350f9394231aa7eed5084197e4f1ea8b66a2e28cad229d7c	2024-04-19 01:42:38.614097+05:30	20221110102408_the_setup15	\N	\N	2024-04-19 01:42:38.600036+05:30	1
29ecfd5f-31fd-46cf-87e7-b9f84c71d4ae	707c481b7fc68a5ae3e7d189ed4f8a764e625804eb92486d494262aa57ee5e7d	2024-04-19 01:42:38.555197+05:30	20220829024024_the_setup8	\N	\N	2024-04-19 01:42:38.550902+05:30	1
b99404fe-e362-4b96-9e64-d1de38166c3c	33dba021c5a2f0218c4004681c158aa873ea7aaa77ab3d43c0fc193e0692a202	2024-04-19 01:42:38.56064+05:30	20220829075641_the_setup9	\N	\N	2024-04-19 01:42:38.556286+05:30	1
c15bcebf-7088-4833-b201-48cefd5b2cab	9cfb327a10f9742889a449890fb53e77c446a81dc8a753b23b1f26098af0e72d	2024-04-19 01:42:38.676336+05:30	20221128125218_the_setup17	\N	\N	2024-04-19 01:42:38.673478+05:30	1
914e1726-cab3-4f6d-ab5c-1e097ba23de6	f54818d898b26bb628e438c42e10ca3364108c7c2b7a714d8b37fcb2540462e1	2024-04-19 01:42:38.56488+05:30	20220829080612_the_setup10	\N	\N	2024-04-19 01:42:38.561686+05:30	1
822f741c-5a9b-4a77-92ac-6de4c6b2abf5	6bcf3c39791fe15346c023226539c82a366e46a66acd6d77a5eed1dd75a51294	2024-04-19 01:42:38.62483+05:30	20221110121507_the_setup16	\N	\N	2024-04-19 01:42:38.615274+05:30	1
5ff5c80a-8d23-41c5-8f30-c071079462ca	d466e2ae021a5371e6f58dc7f0fbf7aa1babd7f771711c16170fb06642634592	2024-04-19 01:42:38.5711+05:30	20220829102946_the_setup11	\N	\N	2024-04-19 01:42:38.565952+05:30	1
442b12f4-ce9e-4861-9e1a-16d2679ebd16	fec9076e93ef468d4945ce9c9e7294cda9838465802fb1ad0359b24b5d19f63b	2024-04-19 01:42:38.576024+05:30	20220902092022_the_setup11	\N	\N	2024-04-19 01:42:38.572334+05:30	1
e57a31f6-1432-4552-a89d-5330aba05cfb	0044e664903448cc4461c64fd9b4440647c8217856fdaa2e935368f6f05afe4f	2024-04-19 01:42:38.580429+05:30	20220906103000_the_setup12	\N	\N	2024-04-19 01:42:38.577197+05:30	1
ca668c01-db97-49b3-8347-aa9e55f67fc7	7e2af42139f2d405eca6a4574236d0a73394c9d5e20f05cc36aee8bd8023f202	2024-04-19 01:42:38.648863+05:30	20221127143648_classroom_the_setup	\N	\N	2024-04-19 01:42:38.626072+05:30	1
304542da-fc93-44d9-a8a3-f14789df381d	9829b1d633261538ff1b2b4da91e3fd1f511e51777bb76c2d8cae42be8bf1aa7	2024-04-19 01:42:38.589782+05:30	20220913081920_the_setup13	\N	\N	2024-04-19 01:42:38.581634+05:30	1
7f0b29dd-0bd1-4681-8830-a73426815414	912a32469fea501f83589ac8c86046c2528222de88aa7b3be172073ff6a75767	2024-04-19 01:42:38.702853+05:30	20230226113408_friendship2	\N	\N	2024-04-19 01:42:38.69958+05:30	1
f7f86f4c-030f-4be8-a6ca-778d6e2fea56	0bd76a7eed35698ab05c79a7b7bcf4bb59785f80c65cdd15676e884242bd75f0	2024-04-19 01:42:38.652923+05:30	20221127183955_classroom_the_setup2	\N	\N	2024-04-19 01:42:38.649979+05:30	1
0aed7477-5967-4e6f-8361-bce1e6264236	f85dbb89a32f7659fecd9a20500e2ef98210fcc14706eda1e0f1af9eb502d89b	2024-04-19 01:42:38.681133+05:30	20221201084821_the_setup18	\N	\N	2024-04-19 01:42:38.677419+05:30	1
b41a8acb-b8ea-466c-bda2-db1e2098f8c1	87e15eadff6d5edbcb2947fbc3fc6daccb4a441ae854967500a5b754c65da5f1	2024-04-19 01:42:38.65711+05:30	20221128063052_classroom_the_setup3	\N	\N	2024-04-19 01:42:38.654041+05:30	1
efdd57e7-ba4a-4ac6-9c0f-52374f0cde84	6eb1ddbf0b857522d383ec5c985babf8060de556a07bbe466baf08deeaf41bde	2024-04-19 01:42:38.667438+05:30	20221128075519_clsroom_the_setup4	\N	\N	2024-04-19 01:42:38.65834+05:30	1
5735c4a4-ab8a-4065-a32b-ee513c82f361	db9fbb8370ee48830cbc1090f5a06dd8e1a62f0df7a45205d14191a6cdec5c3d	2024-04-19 01:42:38.68595+05:30	20221209072322_clsroom_the_setup5	\N	\N	2024-04-19 01:42:38.682238+05:30	1
1fc53460-ae4f-4bd0-ae68-256d39b54c3a	58369a78e4d165de615a264d626ac49d47317789dd36fd5aec52d901879f1cd8	2024-04-19 01:42:38.71149+05:30	20230227081254_friendship3	\N	\N	2024-04-19 01:42:38.703924+05:30	1
9df37c19-95f7-4a85-b865-64180e07b241	7001b4e6e2e46ef4b2037af83f49526d67757e71b8b6085a255b8df94483ea20	2024-04-19 01:42:38.690321+05:30	20230120100704_integration	\N	\N	2024-04-19 01:42:38.687046+05:30	1
013fa93c-e795-41f2-91a6-a8f8ef1fe1b6	d0f5db9a83e8e5399de1ede7085b667f8c7288b568721505af730573781b0407	2024-04-19 01:42:38.698438+05:30	20230222102028_friendship	\N	\N	2024-04-19 01:42:38.691567+05:30	1
462cd737-2e6d-4394-a799-afb0b4d9d483	2730ba5ec4c2dfb9929aee93884d9cb2710e76c08732e292c597c16cc61fbfd0	2024-04-19 01:42:38.716508+05:30	20230227083053_friendship4	\N	\N	2024-04-19 01:42:38.712587+05:30	1
1db6cca4-4372-439d-b367-46a60237c6e8	6d7551525fbca2cb8b9115d31f9dec74c1af2de8804fc7230c123e35c0d9a1d6	2024-04-19 01:42:38.750655+05:30	20240319085957_your_migration_name	\N	\N	2024-04-19 01:42:38.744911+05:30	1
51dcfeb6-648b-4776-9f2b-2656e4f8a161	557d10d44006281a585d2c7dad2bd594c46d9c0a9d3745b1d82702cadb4c109a	2024-04-19 01:42:38.729711+05:30	20240313100537_your_migration_name	\N	\N	2024-04-19 01:42:38.726226+05:30	1
2a606a23-69d0-497f-b7f3-a782c954196c	6e9e33ef8ebf2cfd9a6e54471a10d67fb1770fef93874e2005225a25a45b6984	2024-04-19 01:42:38.743194+05:30	20240319085743_your_migration_name	\N	\N	2024-04-19 01:42:38.730889+05:30	1
4ae7dbb4-1653-4a8b-b8fd-c2e8bddedf0d	620408552dd8d044d49b78698fd7357f8aac1cdf6dbfc8979e8ba7b5dbb6b56e	2024-04-19 01:42:38.766239+05:30	20240319090046_your_migration_name	\N	\N	2024-04-19 01:42:38.751789+05:30	1
b5ad8d11-cf6a-4ced-b4a0-e8343d5af162	2fbe1175b0d412b6c02301aaa9c545e909ff8af4a58215a001a8881a72e9e61a	2024-08-07 11:39:44.963145+05:30	20240521114235_dev	\N	\N	2024-08-07 11:39:44.947259+05:30	1
73388c9b-2284-4cff-aee8-01552b9885fb	f802426f223ea958676255a0dcd0a10daa295a54596f00faf715012087ab499f	2024-08-07 11:39:44.976755+05:30	20240624185737_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:44.964456+05:30	1
17f0a80c-467c-4db1-b501-9f3f5b68ba58	d0ef0c3e52ec83b049e604acb752b5792b87d42aa67c166713ac54c1c5a6dd90	2024-08-07 11:39:44.98268+05:30	20240624194015_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:44.978416+05:30	1
a760775e-918d-4763-8ecd-a6d0f9831376	0e5845e5b684727c586b1c92a5f9018b003d31df5e7b03e2b1d0f988ea3603a3	2024-08-07 11:39:45.004698+05:30	20240627101325_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:44.984188+05:30	1
5894a96f-9e04-4927-ac7e-fc92a30f5558	6fce58e4e36dcc7dd8ce97649c4f40681aa14c78972583ce1898b7299e2314d4	2024-09-13 16:17:49.08029+05:30	20240912084110_dev	\N	\N	2024-09-13 16:17:49.073745+05:30	1
8279bd4d-6eef-4531-a92d-788bf77819c1	997304a9a236c46615ee72f73e87a7428bc0d45104b8ce8c91a6b31d45312fc3	2024-08-07 11:39:45.010255+05:30	20240627102439_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:45.005969+05:30	1
d756c185-89a5-41df-a8d5-3019ec72c4fb	fc41a4908b0b71167bd5f7c8e15c011845e6738578c12fe57f745d2e051ffc76	2024-08-07 11:39:45.03001+05:30	20240703105039_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:45.011707+05:30	1
ae68f508-9374-471e-94f6-6f766621598f	a3d190b1aab8bc3371c84d79116b4e1f4093caa958a3bef9ebabb50fe51ac413	2024-11-26 10:30:50.45671+05:30	20241125091112_final_schema	\N	\N	2024-11-26 10:30:50.438621+05:30	1
8c1d19e9-a486-4ee2-a5ba-6d02d8d4611a	f4369161cb5dcbd10ae67afdf6d57641412607067295a1a3f637241143c01176	2024-08-07 11:39:45.058288+05:30	20240709090325_add_userinfo_table_and_fields	\N	\N	2024-08-07 11:39:45.031492+05:30	1
82579ae5-1157-4397-8750-96c64fb65f95	58c5888f55303279220f9a5715bb66efa3a0d4c74d77496307796dd9084c5cf6	2024-09-20 01:37:24.423028+05:30	20240919093505_dev	\N	\N	2024-09-20 01:37:24.417343+05:30	1
ff2daac0-604f-4a7f-acab-3368a5f6348c	cea72e6600a364c43a94314b115c179847e126f4ed6c3fa01b4df5c8441f6b3a	2024-08-28 12:32:28.783049+05:30	20240822055902_add_profile_model	\N	\N	2024-08-28 12:32:28.737138+05:30	1
4fae257e-46f2-4619-924e-fe0c70c4b899	ec5eaacdf1a743280aab82342861ebaefef86068fba56929c3bfe24dc46400f8	2024-08-28 12:32:28.788658+05:30	20240822060243_add_profile_model	\N	\N	2024-08-28 12:32:28.784357+05:30	1
636d2c24-660a-410b-9621-89686fa85776	cf57d7b5f7aaa09bd9d8a18e73a80a1b2bfdd453a21b85f97420e9e2c4e9b918	2024-09-02 14:34:55.759332+05:30	20240901150919_dev	\N	\N	2024-09-02 14:34:55.740311+05:30	1
76b435d0-9707-45a8-8129-9e747083adaa	738bdc91ac79006bd83f8e4445b443101439edbbcfe3dbabe9e5af54cc9cd000	2024-10-10 03:40:13.572175+05:30	20241003080535_neo10000	\N	\N	2024-10-10 03:40:13.517443+05:30	1
30d2f925-4fa2-4b09-bd61-111230e6aba0	effc287e81c22f5aa57444de10b1b4d662a15e59cdeb82c3f476fd3a937df7cc	2024-09-02 14:34:55.764802+05:30	20240901152000_dev	\N	\N	2024-09-02 14:34:55.760821+05:30	1
35693b5c-1e83-4946-bd48-77dd7e5fa25a	fdf625c774ab2703a561d91d4d4a9c5499e5d75b2b7b442d6a744c1dbc4d7443	2024-09-02 14:34:55.771208+05:30	20240901154317_dev	\N	\N	2024-09-02 14:34:55.766285+05:30	1
7a30d31f-431f-4b93-a727-ba5126785183	21cbf1e184ed9d375d590a8de27886b1e5b849026b601ec45d2324a65d04943e	2024-09-02 14:34:55.776378+05:30	20240902085307_dev	\N	\N	2024-09-02 14:34:55.77257+05:30	1
e5aaa23f-a756-4ecb-952c-4561e0223d19	6cdeb0bbbf9ee8da805fd2951470aef66262ae0fb8330cf7b80adf45c57a1705	2024-10-10 03:40:13.585201+05:30	20241007191806_dev	\N	\N	2024-10-10 03:40:13.573572+05:30	1
fd3be82e-5cf5-45a0-868d-43f7d1593c21	c0d3859a560c2f00bc202bbeb77c601fef186e8a3487b48b6bfc59bbc6d233d1	2024-09-06 13:14:01.857379+05:30	20240905070945_dev	\N	\N	2024-09-06 13:14:01.828758+05:30	1
0d14c551-de30-421e-92be-9e731bcfc7ef	05cc9336b7e2213e494c071dc360ca8f06279cd5f706f62d3dcb3712045b99a3	2024-09-06 13:14:01.885475+05:30	20240905072518_dev	\N	\N	2024-09-06 13:14:01.858896+05:30	1
beca980c-45d2-476d-8f26-c16d159ebe3e	beaccebf0f0af509a34a33a34d6719fbd7858fe3c8a201a5199f22427e9c98d8	2024-11-26 10:30:50.474869+05:30	20241125204522_new_cheme	\N	\N	2024-11-26 10:30:50.458415+05:30	1
b3d3ad83-aeac-478d-a641-913895823131	6c9c86cc5e4e32ed7270a005357d951e14b6ff14fbc56d2881a8737a2e2f3e06	2024-09-06 13:14:01.91849+05:30	20240905185151_dev	\N	\N	2024-09-06 13:14:01.887666+05:30	1
be964b63-4eae-4015-a500-1b8d484c8655	1857c09e75596318ea2afa75589226a18b819b2177b77130354afd36548c1bcb	2024-10-10 03:40:13.59175+05:30	20241007192638_nojo	\N	\N	2024-10-10 03:40:13.586817+05:30	1
6515f123-2e40-471a-a825-f68b4ca44c01	1d03937dcdc24580ae4dbe45b855ffb4271d2baf645892cf40b2f9f1865bfc2f	2024-09-10 08:34:27.786833+05:30	20240909115242_dev	\N	\N	2024-09-10 08:34:27.781491+05:30	1
9e6f7ce8-35a6-4c6a-afe2-a97c96ac6554	e1d98d48f7fb4286f4191deb1d5f69bff2c28e779a1e445c42d919effd920d35	2024-10-10 03:40:13.597867+05:30	20241009093315_dev	\N	\N	2024-10-10 03:40:13.593123+05:30	1
703755a4-51ed-4b1e-a11f-cca057fd4f10	45d3045fb541b778ad34474a8be5cf761234419f17d1ff736171ae5c09798e6b	2024-11-26 10:30:50.48846+05:30	20241126032623_new_to_me	\N	\N	2024-11-26 10:30:50.476543+05:30	1
598894a1-a6f7-42d3-86a7-a98344d9ed9d	e465d11355200c0b7952f3397cb822b67f7071e6f3385f6c0214e82254b5f5f4	2024-11-07 12:57:50.284764+05:30	20241105084845_noo	\N	\N	2024-11-07 12:57:50.236919+05:30	1
d87d47f2-e9a2-45fe-9d2f-b69668ab4b27	e4b98586420fa90a42c1f306acc67453c5a9425226a0c168db27529b02558404	2024-11-07 12:57:50.291474+05:30	20241106083032_noo	\N	\N	2024-11-07 12:57:50.286472+05:30	1
4cca3f31-5256-4587-a9a2-7414cca895d9	240e491b2cfe593c421427415b42e214ca8bd839794135158393c69be7350fc1	2024-11-26 10:30:50.436958+05:30	20241122072341_dev	\N	\N	2024-11-26 10:30:50.395847+05:30	1
5c863768-8448-49a5-ae03-6e3542662b1b	bbefa6e7349b466e7fbe4d23d351f15651a584bd8c59309bb787e32731aa87fe	2025-02-25 15:45:13.35039+05:30	20250225101513_hoo	\N	\N	2025-02-25 15:45:13.321555+05:30	1
a2b630d0-b6cd-4a13-bffd-40df05999fb3	a837c20280d6bd49ccdef2cb8cb5bb4a95e48b322c0fce588646ee7f9d040c32	2025-02-28 12:03:59.234229+05:30	20250228063358_new_changes	\N	\N	2025-02-28 12:03:59.157111+05:30	1
dae3577d-c7e2-4611-95f3-9c52f79591ed	461ae10dbaa0f3c49db1e82862299f926b2d5fb64a700e10641197ef74b238ef	2025-02-28 12:28:30.203511+05:30	20250228065829_new_changes	\N	\N	2025-02-28 12:28:30.008043+05:30	1
\.


--
-- Name: Admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Admin_id_seq"', 1, false);


--
-- Name: Book_mark_Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Book_mark_Post_id_seq"', 9, true);


--
-- Name: Cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Cart_id_seq"', 15, true);


--
-- Name: Class_V_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Class_V_id_seq"', 27, true);


--
-- Name: Classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Classes_id_seq"', 2, true);


--
-- Name: ClassroomUser_V2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."ClassroomUser_V2_id_seq"', 25, true);


--
-- Name: Classroom_Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Classroom_Course_id_seq"', 1, false);


--
-- Name: Classroom_Session_V2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Classroom_Session_V2_id_seq"', 1, false);


--
-- Name: Classroom_V2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Classroom_V2_id_seq"', 4, true);


--
-- Name: Classroom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Classroom_id_seq"', 1, false);


--
-- Name: CommentReaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."CommentReaction_id_seq"', 1, false);


--
-- Name: Comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Comments_id_seq"', 1, false);


--
-- Name: Completed_Class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Completed_Class_id_seq"', 1, false);


--
-- Name: Completed_Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Completed_Course_id_seq"', 1, false);


--
-- Name: Connections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Connections_id_seq"', 9, true);


--
-- Name: Course_V_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Course_V_id_seq"', 1, true);


--
-- Name: Course_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Course_id_seq"', 2, true);


--
-- Name: Follower_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Follower_id_seq"', 1, false);


--
-- Name: Friends_Peer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Friends_Peer_id_seq"', 1, false);


--
-- Name: Friends_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Friends_id_seq"', 1, false);


--
-- Name: Gift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Gift_id_seq"', 1, false);


--
-- Name: KeepAlive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."KeepAlive_id_seq"', 2, true);


--
-- Name: Liked_Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Liked_Post_id_seq"', 11, true);


--
-- Name: Live_Streaming_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Live_Streaming_id_seq"', 19, true);


--
-- Name: MessageRequest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."MessageRequest_id_seq"', 3, true);


--
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Message_id_seq"', 1, false);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- Name: Participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Participants_id_seq"', 1, false);


--
-- Name: Public_Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Public_Post_id_seq"', 78, true);


--
-- Name: Reactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Reactions_id_seq"', 4, true);


--
-- Name: Suggest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Suggest_id_seq"', 1, false);


--
-- Name: User_Info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."User_Info_id_seq"', 13, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Users_id_seq"', 72, true);


--
-- Name: Vid_Classes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Vid_Classes_id_seq"', 1, false);


--
-- Name: Wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bask
--

SELECT pg_catalog.setval('public."Wishlist_id_seq"', 4, true);


--
-- Name: Admin Admin_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Admin"
    ADD CONSTRAINT "Admin_pkey" PRIMARY KEY (id);


--
-- Name: Book_mark_Post Book_mark_Post_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Book_mark_Post"
    ADD CONSTRAINT "Book_mark_Post_pkey" PRIMARY KEY (id);


--
-- Name: Cart Cart_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_pkey" PRIMARY KEY (id);


--
-- Name: Chat_rooms Chat_rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Chat_rooms"
    ADD CONSTRAINT "Chat_rooms_pkey" PRIMARY KEY (_id);


--
-- Name: Class_V Class_V_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Class_V"
    ADD CONSTRAINT "Class_V_pkey" PRIMARY KEY (id);


--
-- Name: Classes Classes_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT "Classes_pkey" PRIMARY KEY (id);


--
-- Name: ClassroomUser_V2 ClassroomUser_V2_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."ClassroomUser_V2"
    ADD CONSTRAINT "ClassroomUser_V2_pkey" PRIMARY KEY (id);


--
-- Name: Classroom_Course Classroom_Course_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Course"
    ADD CONSTRAINT "Classroom_Course_pkey" PRIMARY KEY (id);


--
-- Name: Classroom_Session_V2 Classroom_Session_V2_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Session_V2"
    ADD CONSTRAINT "Classroom_Session_V2_pkey" PRIMARY KEY (id);


--
-- Name: Classroom_V2 Classroom_V2_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_V2"
    ADD CONSTRAINT "Classroom_V2_pkey" PRIMARY KEY (id);


--
-- Name: Classroom Classroom_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom"
    ADD CONSTRAINT "Classroom_pkey" PRIMARY KEY (id);


--
-- Name: CommentReaction CommentReaction_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."CommentReaction"
    ADD CONSTRAINT "CommentReaction_pkey" PRIMARY KEY (id);


--
-- Name: Comments Comments_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_pkey" PRIMARY KEY (id);


--
-- Name: Completed_Class Completed_Class_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Class"
    ADD CONSTRAINT "Completed_Class_pkey" PRIMARY KEY (id);


--
-- Name: Completed_Course Completed_Course_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Course"
    ADD CONSTRAINT "Completed_Course_pkey" PRIMARY KEY (id);


--
-- Name: Connections Connections_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Connections"
    ADD CONSTRAINT "Connections_pkey" PRIMARY KEY (id);


--
-- Name: Course_V Course_V_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course_V"
    ADD CONSTRAINT "Course_V_pkey" PRIMARY KEY (id);


--
-- Name: Course Course_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_pkey" PRIMARY KEY (id);


--
-- Name: Follower Follower_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Follower"
    ADD CONSTRAINT "Follower_pkey" PRIMARY KEY (id);


--
-- Name: Friends_Peer Friends_Peer_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends_Peer"
    ADD CONSTRAINT "Friends_Peer_pkey" PRIMARY KEY (id);


--
-- Name: Friends Friends_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends"
    ADD CONSTRAINT "Friends_pkey" PRIMARY KEY (id);


--
-- Name: Gift Gift_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Gift"
    ADD CONSTRAINT "Gift_pkey" PRIMARY KEY (id);


--
-- Name: KeepAlive KeepAlive_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."KeepAlive"
    ADD CONSTRAINT "KeepAlive_pkey" PRIMARY KEY (id);


--
-- Name: Liked_Post Liked_Post_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Liked_Post"
    ADD CONSTRAINT "Liked_Post_pkey" PRIMARY KEY (id);


--
-- Name: Live_Streaming Live_Streaming_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Live_Streaming"
    ADD CONSTRAINT "Live_Streaming_pkey" PRIMARY KEY (id);


--
-- Name: MessageRequest MessageRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."MessageRequest"
    ADD CONSTRAINT "MessageRequest_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Participants Participants_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_pkey" PRIMARY KEY (id);


--
-- Name: Public_Post Public_Post_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Public_Post"
    ADD CONSTRAINT "Public_Post_pkey" PRIMARY KEY (id);


--
-- Name: Reactions Reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Reactions"
    ADD CONSTRAINT "Reactions_pkey" PRIMARY KEY (id);


--
-- Name: Suggest Suggest_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Suggest"
    ADD CONSTRAINT "Suggest_pkey" PRIMARY KEY (id);


--
-- Name: User_Info User_Info_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."User_Info"
    ADD CONSTRAINT "User_Info_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Vid_Classes Vid_Classes_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Vid_Classes"
    ADD CONSTRAINT "Vid_Classes_pkey" PRIMARY KEY (id);


--
-- Name: Wishlist Wishlist_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Admin_email_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Admin_email_key" ON public."Admin" USING btree (email);


--
-- Name: Book_mark_Post_user_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Book_mark_Post_user_id_key" ON public."Book_mark_Post" USING btree (user_id);


--
-- Name: Cart_user_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Cart_user_id_key" ON public."Cart" USING btree (user_id);


--
-- Name: Classroom_V2_email_type_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Classroom_V2_email_type_key" ON public."Classroom_V2" USING btree (email_type);


--
-- Name: Classroom_email_type_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Classroom_email_type_key" ON public."Classroom" USING btree (email_type);


--
-- Name: Gift_participant_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Gift_participant_id_key" ON public."Gift" USING btree (participant_id);


--
-- Name: KeepAlive_userId_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "KeepAlive_userId_key" ON public."KeepAlive" USING btree ("userId");


--
-- Name: Liked_Post_user_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Liked_Post_user_id_key" ON public."Liked_Post" USING btree (user_id);


--
-- Name: MessageRequest_senderId_receiverId_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "MessageRequest_senderId_receiverId_key" ON public."MessageRequest" USING btree ("senderId", "receiverId");


--
-- Name: Suggest_participant_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Suggest_participant_id_key" ON public."Suggest" USING btree (participant_id);


--
-- Name: Users_email_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Users_email_key" ON public."Users" USING btree (email);


--
-- Name: Wishlist_user_id_key; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "Wishlist_user_id_key" ON public."Wishlist" USING btree (user_id);


--
-- Name: _Book_mark_PostToPublic_Post_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_Book_mark_PostToPublic_Post_AB_unique" ON public."_Book_mark_PostToPublic_Post" USING btree ("A", "B");


--
-- Name: _Book_mark_PostToPublic_Post_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_Book_mark_PostToPublic_Post_B_index" ON public."_Book_mark_PostToPublic_Post" USING btree ("B");


--
-- Name: _CartToCourse_V_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_CartToCourse_V_AB_unique" ON public."_CartToCourse_V" USING btree ("A", "B");


--
-- Name: _CartToCourse_V_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_CartToCourse_V_B_index" ON public."_CartToCourse_V" USING btree ("B");


--
-- Name: _ClassCart_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_ClassCart_AB_unique" ON public."_ClassCart" USING btree ("A", "B");


--
-- Name: _ClassCart_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_ClassCart_B_index" ON public."_ClassCart" USING btree ("B");


--
-- Name: _ClassWishlist_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_ClassWishlist_AB_unique" ON public."_ClassWishlist" USING btree ("A", "B");


--
-- Name: _ClassWishlist_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_ClassWishlist_B_index" ON public."_ClassWishlist" USING btree ("B");


--
-- Name: _Course_VToWishlist_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_Course_VToWishlist_AB_unique" ON public."_Course_VToWishlist" USING btree ("A", "B");


--
-- Name: _Course_VToWishlist_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_Course_VToWishlist_B_index" ON public."_Course_VToWishlist" USING btree ("B");


--
-- Name: _Liked_PostToPublic_Post_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_Liked_PostToPublic_Post_AB_unique" ON public."_Liked_PostToPublic_Post" USING btree ("A", "B");


--
-- Name: _Liked_PostToPublic_Post_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_Liked_PostToPublic_Post_B_index" ON public."_Liked_PostToPublic_Post" USING btree ("B");


--
-- Name: _UsersRelation_AB_unique; Type: INDEX; Schema: public; Owner: bask
--

CREATE UNIQUE INDEX "_UsersRelation_AB_unique" ON public."_UsersRelation" USING btree ("A", "B");


--
-- Name: _UsersRelation_B_index; Type: INDEX; Schema: public; Owner: bask
--

CREATE INDEX "_UsersRelation_B_index" ON public."_UsersRelation" USING btree ("B");


--
-- Name: Book_mark_Post Book_mark_Post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Book_mark_Post"
    ADD CONSTRAINT "Book_mark_Post_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Cart Cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Cart"
    ADD CONSTRAINT "Cart_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Class_V Class_V_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Class_V"
    ADD CONSTRAINT "Class_V_trainer_id_fkey" FOREIGN KEY (trainer_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Classes Classes_classroom_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT "Classes_classroom_course_id_fkey" FOREIGN KEY (classroom_course_id) REFERENCES public."Classroom_Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Classes Classes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classes"
    ADD CONSTRAINT "Classes_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Classroom_Course Classroom_Course_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Course"
    ADD CONSTRAINT "Classroom_Course_creator_fkey" FOREIGN KEY (creator) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Classroom_Course Classroom_Course_host_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_Course"
    ADD CONSTRAINT "Classroom_Course_host_fkey" FOREIGN KEY (host) REFERENCES public."Classroom"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Classroom_V2 Classroom_V2_adminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Classroom_V2"
    ADD CONSTRAINT "Classroom_V2_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CommentReaction CommentReaction_react_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."CommentReaction"
    ADD CONSTRAINT "CommentReaction_react_to_fkey" FOREIGN KEY (react_to) REFERENCES public."Comments"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CommentReaction CommentReaction_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."CommentReaction"
    ADD CONSTRAINT "CommentReaction_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comments Comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comments Comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Comments"
    ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Completed_Class Completed_Class_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Class"
    ADD CONSTRAINT "Completed_Class_trainer_id_fkey" FOREIGN KEY (trainer_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Completed_Course Completed_Course_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Completed_Course"
    ADD CONSTRAINT "Completed_Course_trainer_id_fkey" FOREIGN KEY (trainer_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course_V Course_V_trainer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course_V"
    ADD CONSTRAINT "Course_V_trainer_id_fkey" FOREIGN KEY (trainer_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Course Course_host_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Course"
    ADD CONSTRAINT "Course_host_fkey" FOREIGN KEY (host) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Friends_Peer Friends_Peer_my_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends_Peer"
    ADD CONSTRAINT "Friends_Peer_my_id_fkey" FOREIGN KEY (my_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Friends_Peer Friends_Peer_peer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends_Peer"
    ADD CONSTRAINT "Friends_Peer_peer_id_fkey" FOREIGN KEY (peer_id) REFERENCES public."Friends"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Friends Friends_friend_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Friends"
    ADD CONSTRAINT "Friends_friend_id_fkey" FOREIGN KEY (friend_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Gift Gift_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Gift"
    ADD CONSTRAINT "Gift_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Gift Gift_email_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Gift"
    ADD CONSTRAINT "Gift_email_id_fkey" FOREIGN KEY (email_id) REFERENCES public."Users"(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Gift Gift_participant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Gift"
    ADD CONSTRAINT "Gift_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES public."Participants"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Liked_Post Liked_Post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Liked_Post"
    ADD CONSTRAINT "Liked_Post_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Live_Streaming Live_Streaming_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Live_Streaming"
    ADD CONSTRAINT "Live_Streaming_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participants Participants_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Participants Participants_participant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Participants"
    ADD CONSTRAINT "Participants_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Public_Post Public_Post_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Public_Post"
    ADD CONSTRAINT "Public_Post_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Reactions Reactions_classroom_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Reactions"
    ADD CONSTRAINT "Reactions_classroom_course_id_fkey" FOREIGN KEY (classroom_course_id) REFERENCES public."Classroom_Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Reactions Reactions_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Reactions"
    ADD CONSTRAINT "Reactions_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Reactions Reactions_reactor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Reactions"
    ADD CONSTRAINT "Reactions_reactor_id_fkey" FOREIGN KEY (reactor_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Suggest Suggest_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Suggest"
    ADD CONSTRAINT "Suggest_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Suggest Suggest_email_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Suggest"
    ADD CONSTRAINT "Suggest_email_id_fkey" FOREIGN KEY (email_id) REFERENCES public."Users"(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Suggest Suggest_participant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Suggest"
    ADD CONSTRAINT "Suggest_participant_id_fkey" FOREIGN KEY (participant_id) REFERENCES public."Participants"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: User_Info User_Info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."User_Info"
    ADD CONSTRAINT "User_Info_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Users Users_classroom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_classroom_id_fkey" FOREIGN KEY (classroom_id) REFERENCES public."Classroom"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vid_Classes Vid_Classes_classroom_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Vid_Classes"
    ADD CONSTRAINT "Vid_Classes_classroom_course_id_fkey" FOREIGN KEY (classroom_course_id) REFERENCES public."Classroom_Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Vid_Classes Vid_Classes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Vid_Classes"
    ADD CONSTRAINT "Vid_Classes_course_id_fkey" FOREIGN KEY (course_id) REFERENCES public."Course"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Wishlist Wishlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _Book_mark_PostToPublic_Post _Book_mark_PostToPublic_Post_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Book_mark_PostToPublic_Post"
    ADD CONSTRAINT "_Book_mark_PostToPublic_Post_A_fkey" FOREIGN KEY ("A") REFERENCES public."Book_mark_Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Book_mark_PostToPublic_Post _Book_mark_PostToPublic_Post_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Book_mark_PostToPublic_Post"
    ADD CONSTRAINT "_Book_mark_PostToPublic_Post_B_fkey" FOREIGN KEY ("B") REFERENCES public."Public_Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CartToCourse_V _CartToCourse_V_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_CartToCourse_V"
    ADD CONSTRAINT "_CartToCourse_V_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CartToCourse_V _CartToCourse_V_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_CartToCourse_V"
    ADD CONSTRAINT "_CartToCourse_V_B_fkey" FOREIGN KEY ("B") REFERENCES public."Course_V"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassCart _ClassCart_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_ClassCart"
    ADD CONSTRAINT "_ClassCart_A_fkey" FOREIGN KEY ("A") REFERENCES public."Cart"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassCart _ClassCart_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_ClassCart"
    ADD CONSTRAINT "_ClassCart_B_fkey" FOREIGN KEY ("B") REFERENCES public."Class_V"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassWishlist _ClassWishlist_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_ClassWishlist"
    ADD CONSTRAINT "_ClassWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES public."Class_V"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClassWishlist _ClassWishlist_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_ClassWishlist"
    ADD CONSTRAINT "_ClassWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES public."Wishlist"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Course_VToWishlist _Course_VToWishlist_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Course_VToWishlist"
    ADD CONSTRAINT "_Course_VToWishlist_A_fkey" FOREIGN KEY ("A") REFERENCES public."Course_V"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Course_VToWishlist _Course_VToWishlist_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Course_VToWishlist"
    ADD CONSTRAINT "_Course_VToWishlist_B_fkey" FOREIGN KEY ("B") REFERENCES public."Wishlist"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Liked_PostToPublic_Post _Liked_PostToPublic_Post_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Liked_PostToPublic_Post"
    ADD CONSTRAINT "_Liked_PostToPublic_Post_A_fkey" FOREIGN KEY ("A") REFERENCES public."Liked_Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _Liked_PostToPublic_Post _Liked_PostToPublic_Post_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_Liked_PostToPublic_Post"
    ADD CONSTRAINT "_Liked_PostToPublic_Post_B_fkey" FOREIGN KEY ("B") REFERENCES public."Public_Post"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UsersRelation _UsersRelation_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_UsersRelation"
    ADD CONSTRAINT "_UsersRelation_A_fkey" FOREIGN KEY ("A") REFERENCES public."Classroom_V2"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _UsersRelation _UsersRelation_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bask
--

ALTER TABLE ONLY public."_UsersRelation"
    ADD CONSTRAINT "_UsersRelation_B_fkey" FOREIGN KEY ("B") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO bask;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO bask;


--
-- PostgreSQL database dump complete
--

