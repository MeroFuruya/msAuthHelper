program msAuthHelper;

{$APPTYPE CONSOLE}

{$R *.res}

uses
  System.SysUtils,
  System.StrUtils,
  System.Classes,
  IdHTTPServer,
  IdContext,
  IdCustomHTTPServer,
  IdGlobalProtocols;

type
  TEventClass = class
    procedure onGet(AContext: TIdContext; ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
  end;


{ TEventClass }

procedure TEventClass.onGet(AContext: TIdContext;
  ARequestInfo: TIdHTTPRequestInfo; AResponseInfo: TIdHTTPResponseInfo);
var
  AFilename: string;
begin
  if ARequestInfo.Document = '/' then
  begin
    AFilename := './static/index.html';
  end
  else if ARequestInfo.Document = '/js/index.js' then
  begin
    AFilename := './static/index.js';
  end
  else if ARequestInfo.Document = '/js/login_done.js' then
  begin
    AFilename := './static/login_done.js';
  end
  else
  begin
    AFilename := './static/login_done.html';
  end;
  AResponseInfo.ContentType := AResponseInfo.HTTPServer.MIMETable.GetFileMIMEType(AFilename);;
  AResponseInfo.ContentLength := FileSizeByName(AFilename);
  AResponseInfo.WriteHeader;
  AContext.Connection.IOHandler.WriteFile(AFilename);
end;

var
  server: TIdHTTPServer;
  port: integer;
  events: TEventClass;
begin
  // parse port
  if ParamCount <= 1 then
  begin
    if not TryStrToInt(ParamStr(1), port) then
      port := 8080;
  end
  else
    port := 8080;

  // create events
  events := TEventClass.Create;

  server := TIdHTTPServer.Create(nil);
  server.DefaultPort := port;
  server.OnCommandGet := events.onGet;
  server.Active := True;
  WriteLn('Starting server on port ', port);
  Writeln('Press any key to stop the server.');

  readLn;

  server.Active := false;
end.
