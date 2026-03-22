{
  description = "Moopon - Premium Anime List Manager";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, nixpkgs-unstable, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages = {
          default = self.packages.${system}.appimage;

          appimage = pkgs.stdenv.mkDerivation {
            pname = "moopon";
            version = "1.1.1";

            src = self;

            buildInputs = with pkgs; [
              nodejs_22
              electron
            ];

            nativeBuildInputs = with pkgs; [
              makeWrapper
              autoPatchelfHook
            ];

            buildPhase = ''
              cd moopon-desktop
              npm ci
              npm run build
              npm exec electron-builder -- --linux AppImage
            '';

            installPhase = ''
              mkdir -p $out/bin
              cp moopon-desktop/release/*.AppImage $out/bin/moopon.AppImage
              chmod +x $out/bin/moopon.AppImage
            '';

            meta = with pkgs; {
              description = "Moopon - Premium Anime List Manager";
              homepage = "https://moopon.app";
              license = licenses.mit;
              platforms = platforms.linux;
              mainProgram = "moopon.AppImage";
            };
          };
        };

        devShells.default = pkgs.mkShell {
          name = "moopon";
          packages = with pkgs; [
            nodejs_22
            electron
          ];

          shellHook = ''
            cd moopon-desktop
            export ELECTRON_SKIP_BINARY_DOWNLOAD=1
            echo "========================================="
            echo " Moopon - Premium Anime List Manager"
            echo "========================================="
            echo ""
            echo "CachyOS & NixOS uyumlu"
            echo ""
            echo "Development:"
            echo "  npm run electron:dev"
            echo ""
            echo "Build:"
            echo "  nix build"
            echo "  ./result/bin/moopon.AppImage"
            echo ""
          '';
        };
      }
    );
}
