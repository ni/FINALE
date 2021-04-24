<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="17008000">
	<Item Name="My Computer" Type="My Computer">
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="Globals" Type="Folder">
			<Item Name="FilesAndOutputPathMap.vi" Type="VI" URL="../Helpers/FilesAndOutputPathMap.vi"/>
			<Item Name="PathConfiguration.vi" Type="VI" URL="../PathConfiguration.vi"/>
		</Item>
		<Item Name="Helpers" Type="Folder">
			<Item Name="ApplicationItems.ctl" Type="VI" URL="../JsonConverters/ApplicationItems.ctl"/>
			<Item Name="Bounds.ctl" Type="VI" URL="../Helpers/Bounds.ctl"/>
			<Item Name="ClearDirectory.vi" Type="VI" URL="../Helpers/ClearDirectory.vi"/>
			<Item Name="CreateBlockDiagramImage.vi" Type="VI" URL="../Helpers/CreateBlockDiagramImage.vi"/>
			<Item Name="CreateComponentFolder.vi" Type="VI" URL="../Helpers/CreateComponentFolder.vi"/>
			<Item Name="CreateFilesMetadata.vi" Type="VI" URL="../Helpers/CreateFilesMetadata.vi"/>
			<Item Name="CreateFrontPanelImage.vi" Type="VI" URL="../Helpers/CreateFrontPanelImage.vi"/>
			<Item Name="CreateNewAppInstance.vi" Type="VI" URL="../Helpers/CreateNewAppInstance.vi"/>
			<Item Name="CreateOutputPath.vi" Type="VI" URL="../Helpers/CreateOutputPath.vi"/>
			<Item Name="EscapeJsonString.vi" Type="VI" URL="../Helpers/EscapeJsonString.vi"/>
			<Item Name="FileFolderPathToJson.vi" Type="VI" URL="../Helpers/FileFolderPathToJson.vi"/>
			<Item Name="FilterEmptyStrings.vi" Type="VI" URL="../Helpers/FilterEmptyStrings.vi"/>
			<Item Name="GenerateFolderDiagram.vi" Type="VI" URL="../Helpers/GenerateFolderDiagram.vi"/>
			<Item Name="GenerateSelectorBounds.vi" Type="VI" URL="../Helpers/GenerateSelectorBounds.vi"/>
			<Item Name="GetAllDependencyClasses.vi" Type="VI" URL="../Helpers/GetAllDependencyClasses.vi"/>
			<Item Name="GetCaseNames.vi" Type="VI" URL="../Helpers/GetCaseNames.vi"/>
			<Item Name="GetDependencies.vi" Type="VI" URL="../Helpers/GetDependencies.vi"/>
			<Item Name="GetLocalInstanceName.vi" Type="VI" URL="../Helpers/GetLocalInstanceName.vi"/>
			<Item Name="GetNearestImplemention.vi" Type="VI" URL="../Helpers/GetNearestImplemention.vi"/>
			<Item Name="GetOutputPath.vi" Type="VI" URL="../Helpers/GetOutputPath.vi"/>
			<Item Name="GetOutputRelativePath.vi" Type="VI" URL="../Helpers/GetOutputRelativePath.vi"/>
			<Item Name="LoadProjectItemRecursively.vi" Type="VI" URL="../Helpers/LoadProjectItemRecursively.vi"/>
			<Item Name="LoadProjectRecursively.vi" Type="VI" URL="../Helpers/LoadProjectRecursively.vi"/>
			<Item Name="MasterBoundsToRect.vi" Type="VI" URL="../Helpers/MasterBoundsToRect.vi"/>
			<Item Name="OpenFilesInAppContext.vi" Type="VI" URL="../Helpers/OpenFilesInAppContext.vi"/>
			<Item Name="ProcessInputs.vi" Type="VI" URL="../Helpers/ProcessInputs.vi"/>
			<Item Name="ProcessPath.vi" Type="VI" URL="../Helpers/ProcessPath.vi"/>
			<Item Name="replFolderStructure.vi" Type="VI" URL="../Helpers/replFolderStructure.vi"/>
			<Item Name="SourceJsonPaths.ctl" Type="VI" URL="../JsonConverters/SourceJsonPaths.ctl"/>
			<Item Name="WriteToFilesMap.vi" Type="VI" URL="../Helpers/WriteToFilesMap.vi"/>
		</Item>
		<Item Name="JsonConverters" Type="Folder">
			<Item Name="GObjectConverters" Type="Folder">
				<Item Name="DiagramConverter.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/DiagramConverter/DiagramConverter.lvclass"/>
				<Item Name="FrontPanelConverter.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/FrontPanelConverter/FrontPanelConverter.lvclass"/>
				<Item Name="GObjectConverterBase.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/GObjectConverterBase/GObjectConverterBase.lvclass"/>
				<Item Name="GObjectTypes.ctl" Type="VI" URL="../JsonConverters/GObjectConverters/GObjectTypes.ctl"/>
				<Item Name="StructureConverter.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/StructureConverter/StructureConverter.lvclass"/>
				<Item Name="SubVIConverter.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/SubVIConverter/SubVIConverter.lvclass"/>
				<Item Name="VIObjectConverter.lvclass" Type="LVClass" URL="../JsonConverters/GObjectConverters/VIObjectConverter/VIObjectConverter.lvclass"/>
			</Item>
			<Item Name="Helpers" Type="Folder">
				<Item Name="FilesMetadataGenerator" Type="Folder">
					<Item Name="RegenerateFilesMetadata.vi" Type="VI" URL="../JsonConverters/Helpers/RegenerateFilesMetadata.vi"/>
				</Item>
				<Item Name="AddClassChildrenToClassMetadata.vi" Type="VI" URL="../JsonConverters/AddClassChildrenToClassMetadata.vi"/>
				<Item Name="DirectoryMetadata.lvclass" Type="LVClass" URL="../JsonConverters/Helpers/DirectoryMetadata/DirectoryMetadata.lvclass"/>
				<Item Name="DynamicDispatchImplementationWalker.lvlib" Type="Library" URL="../JsonConverters/GObjectConverters/SubVIConverter/DynamicDispatch/DynamicDispatchImplementationWalker.lvlib"/>
				<Item Name="JSONConstants.vi" Type="VI" URL="../JsonConverters/JSONConstants.vi"/>
			</Item>
			<Item Name="LVFileConverters" Type="Folder">
				<Item Name="ClassConverter.lvclass" Type="LVClass" URL="../JsonConverters/LVFileConverters/ClassConverter/ClassConverter.lvclass"/>
				<Item Name="FileConverterBase.lvclass" Type="LVClass" URL="../JsonConverters/ConverterBase/FileConverterBase.lvclass"/>
				<Item Name="SupportedFileTypes.ctl" Type="VI" URL="../JsonConverters/SupportedFileTypes.ctl"/>
				<Item Name="VIConverter.lvclass" Type="LVClass" URL="../JsonConverters/LVFileConverters/VIConverter/VIConverter.lvclass"/>
			</Item>
			<Item Name="BoundsToJson.vi" Type="VI" URL="../JsonConverters/BoundsToJson.vi"/>
			<Item Name="DiagramToJson.vi" Type="VI" URL="../JsonConverters/DiagramToJson.vi"/>
			<Item Name="EnumControlToJson.vi" Type="VI" URL="../JsonConverters/EnumControlToJson.vi"/>
			<Item Name="FlatSequenceToJson.vi" Type="VI" URL="../JsonConverters/FlatSequenceToJson.vi"/>
			<Item Name="FolderToJson.vi" Type="VI" URL="../JsonConverters/FolderToJson.vi"/>
			<Item Name="JsonFormatter.lvlib" Type="Library" URL="../JsonConverters/JsonFormatter/JsonFormatter.lvlib"/>
			<Item Name="MultiDiagramStructureToJson.vi" Type="VI" URL="../Helpers/MultiDiagramStructureToJson.vi"/>
			<Item Name="PanelToJSON.vi" Type="VI" URL="../JsonConverters/PanelToJSON.vi"/>
			<Item Name="SeqFrameToJson.vi" Type="VI" URL="../JsonConverters/SeqFrameToJson.vi"/>
			<Item Name="StructureToJson.vi" Type="VI" URL="../JsonConverters/StructureToJson.vi"/>
			<Item Name="TreeSerializer.lvlib" Type="Library" URL="../JsonConverters/TreeSerializer/TreeSerializer.lvlib"/>
		</Item>
		<Item Name="Tests" Type="Folder">
			<Item Name="CallGenerator.vi" Type="VI" URL="../Tests/CallGenerator.vi"/>
		</Item>
		<Item Name="Util" Type="Folder">
			<Item Name="CloseProgressBar.vi" Type="VI" URL="../Util/CloseProgressBar.vi"/>
			<Item Name="GetAbort.vi" Type="VI" URL="../Util/GetAbort.vi"/>
			<Item Name="InitProgressBar.vi" Type="VI" URL="../Util/InitProgressBar.vi"/>
			<Item Name="ProgressBar.vi" Type="VI" URL="../Util/ProgressBar.vi"/>
			<Item Name="UpdateProgressBar.vi" Type="VI" URL="../Util/UpdateProgressBar.vi"/>
		</Item>
		<Item Name="GenerateHTML.vi" Type="VI" URL="../GenerateHTML.vi"/>
		<Item Name="GeneratorUI-Advanced.vi" Type="VI" URL="../GeneratorUI-Advanced.vi"/>
		<Item Name="Main.vi" Type="VI" URL="../Main.vi"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Check Color Table Size.vi" Type="VI" URL="/&lt;vilib&gt;/picture/jpeg.llb/Check Color Table Size.vi"/>
				<Item Name="Check Data Size.vi" Type="VI" URL="/&lt;vilib&gt;/picture/jpeg.llb/Check Data Size.vi"/>
				<Item Name="Check File Permissions.vi" Type="VI" URL="/&lt;vilib&gt;/picture/jpeg.llb/Check File Permissions.vi"/>
				<Item Name="Check if File or Folder Exists.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Check if File or Folder Exists.vi"/>
				<Item Name="Check Path.vi" Type="VI" URL="/&lt;vilib&gt;/picture/jpeg.llb/Check Path.vi"/>
				<Item Name="Clear Errors.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Clear Errors.vi"/>
				<Item Name="Compare Two Paths.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Compare Two Paths.vi"/>
				<Item Name="Directory of Top Level VI.vi" Type="VI" URL="/&lt;vilib&gt;/picture/jpeg.llb/Directory of Top Level VI.vi"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="Get File Extension.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Get File Extension.vi"/>
				<Item Name="imagedata.ctl" Type="VI" URL="/&lt;vilib&gt;/picture/picture.llb/imagedata.ctl"/>
				<Item Name="Is Path and Not Empty.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/file.llb/Is Path and Not Empty.vi"/>
				<Item Name="LVRectTypeDef.ctl" Type="VI" URL="/&lt;vilib&gt;/Utility/miscctls.llb/LVRectTypeDef.ctl"/>
				<Item Name="NI_FileType.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/lvfile.llb/NI_FileType.lvlib"/>
				<Item Name="NI_PackedLibraryUtility.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/LVLibp/NI_PackedLibraryUtility.lvlib"/>
				<Item Name="Write PNG File.vi" Type="VI" URL="/&lt;vilib&gt;/picture/png.llb/Write PNG File.vi"/>
			</Item>
			<Item Name="EnumToJson.vi" Type="VI" URL="../JsonConverters/EnumToJson.vi"/>
			<Item Name="FunctionToJson.vi" Type="VI" URL="../JsonConverters/FunctionToJson.vi"/>
			<Item Name="ProjToJson.vi" Type="VI" URL="../JsonConverters/ProjToJson.vi"/>
			<Item Name="TabControlToJSON.vi" Type="VI" URL="../JsonConverters/TabControlToJSON.vi"/>
			<Item Name="TargetToJSON.vi" Type="VI" URL="../JsonConverters/TargetToJSON.vi"/>
		</Item>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
</Project>
